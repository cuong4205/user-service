import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-service-client',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer-group',
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(3000);

  const grpcApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './src/proto/user.proto',
        url: 'localhost:50000',
      },
    },
  );
  await grpcApp.listen();
  console.log('User service started');
}
void bootstrap();
