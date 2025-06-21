import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CatService } from './catService';
import { Cat } from './model/Interface/catInterface';
import { AddCatDto } from './model/DTO/addCatDto';

@Controller('cats')
export class CatController {
  constructor(private catService: CatService) {}

  @Post('create')

  createCat(@Body() createCatDto: AddCatDto): void {
    this.catService.createCat(createCatDto);
  }

  @Get('all')
  getAllCats(): Cat[] {
    return this.catService.getAllCats();
  }

  @Get(':id')
  getCatById(@Param('id') id: number): Cat {
    return this.catService.getCatById(id);
  }
}
