import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './model/video.schema';
import { VideoController } from './video.controller';
import { VideoClientsModule } from './video-client.module';
import { CustomEsModule } from './elasticsearch/elasticsearch.module';
import { RedisModule } from 'redis/redis.module';
import { DatabaseModule } from '../lib/common/mongodb/database.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    CustomEsModule,
    VideoClientsModule,
    RedisModule,
    DatabaseModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
