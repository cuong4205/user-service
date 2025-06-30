import { Video } from './model/video.schema';
import { VideoRepository } from './video.repository';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from '../user/model/user.schema';
export declare class VideoService {
    private readonly videoRepository;
    private client;
    private userService;
    constructor(videoRepository: VideoRepository, client: ClientGrpc);
    onModuleInit(): void;
    getAll(): Promise<Video[]>;
    findById(id: string): Promise<Video>;
    findByTitle(title: string): Promise<Video>;
    create(video: Partial<Video>): Promise<Video>;
    deleteByTitle(title: string): Promise<Video>;
    findByOwnerId(ownerId: string): Promise<Video[]>;
    updateById(id: string, updateVideoDto: Partial<Video>): Promise<Video | null>;
    findUserById(id: string): Promise<User>;
}
