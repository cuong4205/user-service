import { VideoService } from './video.service';
import { Video } from './model/video.schema';
import { UploadVideoDto } from './model/uploadVideo.dto';
import { User } from '../user/model/user.schema';
export declare class VideoController {
    private videoService;
    constructor(videoService: VideoService);
    getAll(): Promise<Video[]>;
    findByTitle(title: string): Promise<Video | null>;
    uploadVideo(uploadVideoDto: UploadVideoDto): Promise<Video>;
    deleteVideo(title: string): Promise<Video>;
    findByOwnerId(id: string): Promise<Video[]>;
    findUserById(id: string): Promise<User>;
}
