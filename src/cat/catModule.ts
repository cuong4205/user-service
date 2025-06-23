import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Cat, CatSchema } from './model/Schema/catSchema';
import { CatService } from './catService';
import { CatController } from './catController';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }])],
  providers: [CatService],
  controllers: [CatController],
})
export class CatModule {}
