import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { Video, VideoSchema } from './model/video.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomEsModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    CustomEsModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}
