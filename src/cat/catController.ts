import { Controller, Get, Post, Body, Query, Delete } from '@nestjs/common';
import { CatService } from './catService';
import { Cat } from './model/Schema/catSchema';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post('create')
  async createCat(@Body() cat: Partial<Cat>) {
    return this.catService.createCat(cat);
  }

  @Get('all')
  async getAllCats() {
    return this.catService.findAll();
  }

  @Get(':name')
  async findByName(@Query('name') name: string ){
    return this.catService.findByName(name);
  }
  
  @Get(':breed')
  async findByBreed(@Query('breed') breed: string) {
    return this.catService.findByBreed(breed);
  }

  @Delete('/delete/:name')
  async removeByName(@Query('name') name: string) {
    return this.catService.removeByName(name);
  }
}
