import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './model/video.schema';
import { CustomEsService } from './elasticsearch/elasticsearch.service';

@Injectable()
export class VideoRepository {
  private readonly esService: CustomEsService;
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findAll(): Promise<Video[]> {
    const result = await this.esService.search('videos', {
      query: { match_all: {} },
    });
    return result.hits.hits.map((hit) => hit._source as Video);
  }

  async findById(id: string): Promise<Video | null> {
    const result = await this.esService.get('videos', id);
    return result._source as Video;
  }

  async findByTitle(title: string): Promise<Video[]> {
    const rs = await this.esService.search('videos', {
      query: { match: { title: title } },
    });
    return rs.hits.hits.map((hit) => hit._source as Video);
  }

  async create(video: Partial<Video>): Promise<Video> {
    const newVideo = new this.videoModel(video);
    await this.esService.index('videos', newVideo.id, {
      title: newVideo.title,
      description: newVideo.description,
      url: newVideo.url,
    });
    return newVideo.save();
  }

  async deleteByTitle(title: string): Promise<Video> {
    const deleted = await this.videoModel
      .findOneAndDelete({ title: new RegExp(title, 'i') })
      .lean()
      .exec();
    if (deleted) {
      await this.esService.delete('videos', deleted.id);
    }
    return deleted as Video;
  }

  async findByOwner(ownerId: string): Promise<Video[]> {
    const result = await this.esService.search('videos', {
      query: { match: { owner: ownerId } },
    });
    return result.hits.hits.map((hit) => hit._source as Video);
  }

  async updateById(id: string, update: Partial<Video>): Promise<Video | null> {
    const video = await this.findById(id);
    if (!video) {
      return null;
    }
    await this.esService.update('videos', id, update);
    return this.videoModel.findByIdAndUpdate(id, update, { new: true }).exec();
  }
}
