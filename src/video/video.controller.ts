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
    try {
      return await this.videoService.getAll();
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('Videos not found');
    }
  }

  @Get('findByTitle')
  async findByTitle(@Query('title') title: string): Promise<Video | null> {
    try {
      return await this.videoService.findByTitle(title);
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('Video not found');
    }
  }

  @Post('upload')
  async uploadVideo(@Body() uploadVideoDto: UploadVideoDto): Promise<Video> {
    try {
      return await this.videoService.create(uploadVideoDto);
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('Video not created');
    }
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
    try {
      return await this.videoService.findByOwnerId(id);
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('Videos not found');
    }
  }

  @Get('find/user')
  async findUserById(@Query('id') id: string): Promise<User> {
    try {
      return await this.videoService.findUserById(id);
    } catch (error) {
      console.log(error);
      throw new ResourceNotFoundException('User not found');
    }
  }
}
