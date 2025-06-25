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
    await this.esService.search('videos', { query: { match_all: {} } });
    return this.VideoModel.find().exec();
  }

  async findByTitle(title: string): Promise<Video> {
    const video = await this.VideoModel.findOne({
      title: new RegExp(title, 'i'),
    }).exec();

    if (!video) {
      throw new ResourceNotFoundException(
        `Video with title "${title}" not found`,
      );
    }

    return video;
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

  async checkAllEsData(): Promise<any> {
    return await this.esService.search('videos', {
      query: { match_all: {} },
    });
  }
}
