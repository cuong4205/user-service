import {
  Module,
  NestModule,
  RequestMethod,
  MiddlewareConsumer,
} from '@nestjs/common';
import { LoggerMiddleware } from './middleware/loggerMiddleware';
import { CatModule } from './cat/catModule';
import { DatabaseModule } from './database/database.module'
@Module({
  imports: [DatabaseModule, CatModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: 'cat', method: RequestMethod.GET });
  }
}