import { NestFactory } from '@nestjs/core';
import { VideoModule } from './video.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(VideoModule);
  await app.listen(3000);
  console.log('HTTP User Service is running on localhost:3000');
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    VideoModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'video',
        protoPath: './src/proto/video.proto',
        url: 'localhost:5051',
      },
    },
  );
  await grpcApp.listen();
  console.log('gRPC User Service is running on localhost:5052');

  const redisApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    VideoModule,
    {
      transport: Transport.REDIS,
      options: {
        host: 'localhost',
        port: 6379,
      },
    },
  );
  await redisApp.listen();
  console.log('Redis User Service is running on localhost:6379');
}
bootstrap();
