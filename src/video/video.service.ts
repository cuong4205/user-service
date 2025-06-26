import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './model/video.schema';
import { CustomEsService } from './elasticsearch/elasticsearch.service';
import { ResourceNotFoundException } from './exception/ResourceNotFoundException';
@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private VideoModel: Model<VideoDocument>,
    private readonly esService: CustomEsService,
  ) {}

  async getAll(): Promise<Video[]> {
    try {
      const rs = await this.esService.search('videos', {
        query: { match_all: {} },
      });
      return rs.hits.hits.map((hit) => hit._source as Video);
    } catch (error) {
      throw new ResourceNotFoundException('Video not found');
    }
  }

  async findByTitle(title: string): Promise<Video[]> {
    const video = await this.esService.search('videos', {
      query: { match: { title } },
    });

    if (!video) {
      throw new ResourceNotFoundException(
        `Video with title "${title}" not found`,
      );
    }
    const result = video.hits.hits.map((hit) => hit._source as Video);

    return result;
  }

  async uploadVideo(uploadVideoDto: Partial<Video>): Promise<Video> {
    const newVideo = new this.VideoModel(uploadVideoDto) as VideoDocument;
    await newVideo.save();

    await this.esService.index('videos', newVideo._id as string, {
      title: newVideo.title,
      description: newVideo.description,
      url: newVideo.url,
    });
    return newVideo;
  }

  async deleteVideo(title: string): Promise<Video | null> {
    const deleted = await this.VideoModel.findOneAndDelete({
      title: new RegExp(title, 'i'),
    })
      .lean()
      .exec();

    if (!deleted) {
      throw new ResourceNotFoundException(
        `Video with title "${title}" not found`,
      );
    }

    try {
      await this.esService.delete('videos', deleted._id.toString());
    } catch (error) {
      throw new ResourceNotFoundException(`Can't access to elasticsearch`);
    }

    return deleted;
  }

  async findByOwner(userId: string): Promise<Video[]> {
    try {
      const result = await this.esService.search('videos', {
        query: { match: { owner: userId } },
      });

      return result.hits.hits.map((hit) => hit._source as Video);
    } catch (error) {
      throw new ResourceNotFoundException('User not found');
    }
  }
}
