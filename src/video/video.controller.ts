import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './model/video.schema';
import { UploadVideoDto } from './model/uploadVideo.dto';
import { ResourceNotFoundException } from '../lib/common/exception/ResourceNotFoundException';
import { User } from '../user/model/user.schema';

/* todo: Handle not found exception
 */
@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('all')
  async getAll(): Promise<Video[]> {
    return await this.videoService.getAll();
  }

  @Get('findByTitle')
  async findByTitle(@Query('title') title: string): Promise<Video[] | null> {
    return await this.videoService.findByTitle(title);
  }

  @Post('upload')
  async uploadVideo(@Body() uploadVideoDto: UploadVideoDto): Promise<Video> {
    return await this.videoService.create(uploadVideoDto);
  }

  @Delete('delete')
  async deleteVideo(@Query('title') title: string): Promise<Video> {
    try {
      const deleted = await this.videoService.deleteByTitle(title);
      if (!deleted) {
        throw new ResourceNotFoundException('Video not found');
      }
      return deleted;
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('Video not found');
    }
  }

  @Get('find/owner')
  async findByOwnerId(@Query('id') id: string): Promise<Video[]> {
    return await this.videoService.findByOwnerId(id);
  }

  @Get('findOwner')
  async findUserByIdAsync(@Query('id') id: string): Promise<User> {
    return await this.videoService.findUserByIdAsync(id);
  }
}
