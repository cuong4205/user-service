import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  await app.listen(3000);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './src/proto/user.proto',
        url: 'localhost:5052',
      },
    },
  );
  await grpcApp.listen();
}
bootstrap();
