import { Model } from 'mongoose';
import { Video, VideoDocument } from './model/video.schema';
export declare class VideoRepository {
    private readonly videoModel;
    private readonly esService;
    private readonly redisService;
    constructor(videoModel: Model<VideoDocument>);
    findAll(): Promise<Video[]>;
    findById(id: string): Promise<Video | null>;
    findByTitle(title: string): Promise<Video | null>;
    create(video: Partial<Video>): Promise<Video>;
    deleteByTitle(title: string): Promise<Video>;
    findByOwner(ownerId: string): Promise<Video[]>;
    updateById(id: string, update: Partial<Video>): Promise<Video | null>;
}
