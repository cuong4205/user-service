import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/loggerMiddleware';
import { UserModule } from './user/user.module';
import { UserDatabaseModule } from './user/database/database.module'
import { ConfigModule } from '@nestjs/config';
import mongoConfig from './user/config/database.config';
import { VideoDatabaseModule } from './video/database/mongo.module';
import { VideoModule } from './video/video.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
    UserDatabaseModule,
    UserModule,
    VideoDatabaseModule,
    VideoModule,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'user', method: RequestMethod.GET });

    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'video', method: RequestMethod.POST });
  }

}