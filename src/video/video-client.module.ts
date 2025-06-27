import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'VIDEO_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: './src/video/proto/video.proto',
          url: 'localhost:5052',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class VideoClientsModule {}
