import { NestFactory } from '@nestjs/core';
import { CatModule } from './cat/catModule';

async function bootstrap() {
  const app = await NestFactory.create(CatModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
