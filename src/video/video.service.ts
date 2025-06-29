import {
  Injectable,
  NotFoundException,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from './model/video.schema';
import { VideoRepository } from './video.repository';
import { Observable } from 'rxjs';
import { ClientGrpc } from '@nestjs/microservices';
import { User } from '../user/model/user.schema';
import { lastValueFrom } from 'rxjs';

interface UserServiceInterface {
  findUserById(request: { id: string }): Observable<User>;
}

@Injectable()
export class VideoService {
  private userService: UserServiceInterface;

  constructor(
    @InjectModel(Video.name) private readonly videoRepository: VideoRepository,
    @Inject('USER_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService =
      this.client.getService<UserServiceInterface>('UserService');
  }

  async getAll(): Promise<Video[]> {
    try {
      return await this.videoRepository.findAll();
    } catch (error) {
      console.error('Error fetching all videos:', error);
      throw new Error('Failed to fetch videos');
    }
  }

  async findById(id: string): Promise<Video> {
    if (!id) {
      throw new BadRequestException('Video ID is required');
    }

    try {
      const result = await this.videoRepository.findById(id);
      if (!result) {
        throw new NotFoundException(`Video with ID ${id} not found`);
      }
      return result;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error finding video by ID ${id}:`, error);
      throw new Error('Failed to find video');
    }
  }

  async findByTitle(title: string): Promise<Video[]> {
    if (!title) {
      throw new BadRequestException('Video title is required');
    }

    try {
      const videos = await this.videoRepository.findByTitle(title);
      return videos; // Return empty array if no videos found, don't throw error
    } catch (error) {
      console.error(`Error finding videos by title ${title}:`, error);
      throw new Error('Failed to search videos by title');
    }
  }

  async create(video: Partial<Video>): Promise<Video> {
    if (!video.title || !video.owner) {
      throw new BadRequestException('Video title and owner ID are required');
    }

    try {
      return await this.videoRepository.create(video);
    } catch (error) {
      console.error('Error creating video:', error);
      throw new Error('Failed to create video');
    }
  }

  async deleteByTitle(title: string): Promise<Video> {
    if (!title) {
      throw new BadRequestException('Video title is required');
    }

    try {
      const deletedVideo = await this.videoRepository.deleteByTitle(title);
      if (!deletedVideo) {
        throw new NotFoundException(`Video with title "${title}" not found`);
      }
      return deletedVideo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error deleting video by title ${title}:`, error);
      throw new Error('Failed to delete video');
    }
  }

  async findByOwnerId(ownerId: string): Promise<Video[]> {
    if (!ownerId) {
      throw new BadRequestException('Owner ID is required');
    }

    try {
      const videos = await this.videoRepository.findByOwner(ownerId);
      return videos; // Return empty array if no videos found
    } catch (error) {
      console.error(`Error finding videos by owner ${ownerId}:`, error);
      throw new Error('Failed to find videos by owner');
    }
  }

  async updateById(
    id: string,
    updateVideoDto: Partial<Video>,
  ): Promise<Video | null> {
    if (!id) {
      throw new BadRequestException('Video ID is required');
    }

    try {
      const updatedVideo = await this.videoRepository.updateById(
        id,
        updateVideoDto,
      );
      if (!updatedVideo) {
        throw new NotFoundException(`Video with ID ${id} not found`);
      }
      return updatedVideo;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error(`Error updating video ${id}:`, error);
      throw new Error('Failed to update video');
    }
  }

  findUserById(id: string): Observable<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    try {
      return this.userService.findUserById({ id });
    } catch (error) {
      console.error(`Error finding user by ID ${id}:`, error);
      throw new NotFoundException('User not found');
    }
  }

  async findUserByIdAsync(id: string): Promise<User> {
    if (!id) {
      throw new BadRequestException('User ID is required');
    }

    try {
      return await lastValueFrom(this.userService.findUserById({ id }));
    } catch (error) {
      console.error(`Error finding user by ID ${id}:`, error);
      throw new NotFoundException('User not found');
    }
  }
}
