import { Injectable } from '@nestjs/common';
import { AddCatDto } from './model/DTO/addCatDto';
import { InjectModel } from '@nestjs/mongoose';
import { Cat, CatDocument } from './model/Schema/catSchema';
import { Model } from 'mongoose';

@Injectable()
export class CatService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}
  private cats: Cat[] = [];

  async createCat(addCatDto: Partial<Cat>): Promise<Cat> {
    const newCat = new this.catModel(addCatDto);
    return newCat.save();
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec();
  }

  async findByName(name: string): Promise<Cat[]> {
    // eslint-disable-next-line prettier/prettier
    return this.catModel.find({ name: new RegExp(name, 'i') }).lean().exec();
  }

  async findByBreed(breed: string): Promise<Cat[]> {
    return this.catModel
      .find({ breed: new RegExp(breed, 'i') })
      .lean().exec();
  }

  async removeByName(name: string): Promise<string> {
    const result = await this.catModel
      .deleteMany({ name: new RegExp(name, 'i') })
      .exec();
    return `${result.deletedCount} cat(s) removed.`;
  }
}
