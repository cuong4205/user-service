import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './model/video.schema';
import { UploadVideoDto } from './model/uploadVideo.dto';

@Controller('videos')
export class VideoController {
  constructor(private videoService: VideoService) {}

  @Get('all')
  async getAll(): Promise<Video[]> {
    return this.videoService.getAll();
  }

  @Get('findByTitle/:title')
  async findByTitle(@Param('title') title: string): Promise<Video | null> {
    return this.videoService.findByTitle(title);
  }

  @Post('uploadVideo')
  async uploadVideo(@Body() uploadVideoDto: UploadVideoDto): Promise<Video> {
    return this.videoService.uploadVideo(uploadVideoDto);
  }

  @Delete('deleteVideo/:title')
  async deleteVideo(@Param('title') title: string): Promise<Video | null> {
    return this.videoService.deleteVideo(title);
  }
}
