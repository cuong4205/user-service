"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const video_module_1 = require("./video.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(video_module_1.VideoModule);
    await app.listen(3000);
    console.log('HTTP User Service is running on localhost:3000');
    const grpcApp = await core_1.NestFactory.createMicroservice(video_module_1.VideoModule, {
        transport: microservices_1.Transport.GRPC,
        options: {
            package: 'video',
            protoPath: './src/proto/video.proto',
            url: 'localhost:5051',
        },
    });
    await grpcApp.listen();
    console.log('gRPC User Service is running on localhost:5052');
    const redisApp = await core_1.NestFactory.createMicroservice(video_module_1.VideoModule, {
        transport: microservices_1.Transport.REDIS,
        options: {
            host: 'localhost',
            port: 6379,
        },
    });
    await redisApp.listen();
    console.log('Redis User Service is running on localhost:6379');
}
bootstrap();
//# sourceMappingURL=video.main.js.map