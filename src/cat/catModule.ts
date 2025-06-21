import { Module } from '@nestjs/common';
import { CatController } from './catController';
import { CatService } from './catService';

@Module({
  controllers: [CatController],
  providers: [CatService],
})
export class CatModule {}
