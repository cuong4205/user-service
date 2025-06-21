import { Injectable } from '@nestjs/common';
import { Cat } from './model/Interface/catInterface';
import { AddCatDto } from './model/DTO/addCatDto';

@Injectable()
export class CatService {
  private cats: Cat[] = [];
  createCat(createCatDto: AddCatDto): void {
    const newCat: Cat = {
      id: this.cats.length + 1,
      name: createCatDto.name,
      age: createCatDto.age,
    };
    this.cats.push(newCat);
  }

  getAllCats(): Cat[] {
    return this.cats;
  }

  getCatById(id: number): Cat {
    return this.cats[id - 1];
  }
}
