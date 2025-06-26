import { Controller, Get, Post, Delete, Body, Query } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './model/video.schema';
import { UploadVideoDto } from './model/uploadVideo.dto';

/* todo: Handle not found exception
  integrated elasticsearch
  change video scheama to supports tag
*/
@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('all')
  async getAll(): Promise<Video[]> {
    return this.videoService.getAll();
  }

  @Get('findByTitle')
  async findByTitle(@Query('title') title: string): Promise<Video[] | null> {
    return this.videoService.findByTitle(title);
  }

  @Post('upload')

  async uploadVideo(@Body() uploadVideoDto: UploadVideoDto): Promise<Video> {
    return this.videoService.uploadVideo(uploadVideoDto);
  }

  @Delete('delete')
  async deleteVideo(@Query('title') title: string): Promise<Video | null> {
    return this.videoService.deleteVideo(title);
  }

  @Get('find/owner/:userId')
  async getByOwner(userId: string): Promise<Video[]> {
    return this.videoService.findByOwner(userId);
  }
}
