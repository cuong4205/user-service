import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from './model/video.schema';
import { VideoController } from './video.controller';
import { UserClientsModule } from 'src/user/user-client.module';

import { CustomEsModule } from './elasticsearch/elasticsearch.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }]),
    CustomEsModule,
    UserClientsModule,
  ],
  controllers: [VideoController],
  providers: [VideoService],
  exports: [VideoService],
})
export class VideoModule {}
