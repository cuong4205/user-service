import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, ObjectId } from 'mongoose';
import { Video, VideoDocument } from './model/video.schema';

@Injectable()
export class VideoRepository {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>,
  ) {}

  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }

  async findById(id: string | ObjectId): Promise<Video | null> {
    const objectId = typeof id === 'string' ? new Types.ObjectId(id) : id;
    return this.videoModel.findById(objectId).exec();
  }

  async findByTitle(title: string): Promise<Video[]> {
    return this.videoModel.find({ title: new RegExp(title, 'i') }).exec();
  }

  async create(video: Partial<Video>): Promise<Video> {
    const newVideo = new this.videoModel(video);
    return newVideo.save();
  }

  async deleteByTitle(title: string): Promise<Video | null> {
    return this.videoModel
      .findOneAndDelete({ title: new RegExp(title, 'i') })
      .lean()
      .exec();
  }

  async findByOwner(ownerId: string | ObjectId): Promise<Video[]> {
    const objectId =
      typeof ownerId === 'string' ? new Types.ObjectId(ownerId) : ownerId;
    return this.videoModel.find({ owner: objectId }).exec();
  }

  async updateById(
    id: string | ObjectId,
    update: Partial<Video>,
  ): Promise<Video | null> {
    const objectId = typeof id === 'string' ? new Types.ObjectId(id) : id;
    return this.videoModel
      .findByIdAndUpdate(objectId, update, { new: true })
      .exec();
  }
}
