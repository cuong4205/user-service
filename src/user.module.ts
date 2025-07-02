import { Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './model/user.schema';
import { UserClientsModule } from './user-client.module';
import { UserDatabaseModule } from './mongodb/database.module';
import { UserRepository } from './user.repository';
import { VideoClientsModule } from './video-client.module';
import mongoConfig from './mongodb/database.config';
import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer } from '@nestjs/common/interfaces';
import { LoggerMiddleware } from './middleware/loggerMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mongoConfig],
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserClientsModule,
    UserDatabaseModule,
    VideoClientsModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(UserController);
  }
}
