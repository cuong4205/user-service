import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3000);
  console.log('HTTP User Service is running on localhost:3000');
  // Start gRPC microservice
  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './src/proto/user.proto',
        url: 'localhost:5051',
      },
    },
  );
  await grpcApp.listen();
  console.log('gRPC User Service is running on localhost:5051');
}
bootstrap();
