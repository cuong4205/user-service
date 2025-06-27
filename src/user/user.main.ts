import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  // Start gRPC microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './src/user/proto/user.proto',
        url: 'localhost:50052',
      },
    },
  );
  await grpcApp.listen();
  console.log('gRPC User Service is running on localhost:50051');
}
bootstrap();
