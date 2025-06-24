import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './model/video.schema';

@Injectable()
export class VideoService {
  constructor(
    @InjectModel(Video.name) private VideoModel: Model<VideoDocument>,
  ) {}

  async getAll(): Promise<Video[]> {
    return this.VideoModel.find().exec();
  }

  async findByTitle(title: string): Promise<Video | null> {
    return this.VideoModel.findOne({ title: new RegExp(title, 'i') }).exec();
  }

  async uploadVideo(uploadVideoDto: Partial<Video>): Promise<Video> {
    const newVideo = new this.VideoModel(uploadVideoDto);
    return newVideo.save();
  }

  async deleteVideo(title: string): Promise<Video | null> {
    return this.VideoModel.findOneAndDelete({
      title: new RegExp(title, 'i'),
    }).exec();
  }

}
