import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/schema/user.schema';
import { UserDto } from './model/DTO/user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }
  
  @Get('find')
  async findByName(@Query('name') name: string): Promise<User | null> {
    return this.userService.findByName(name);
  }

  @Post('create')
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('update/:name')
  async updateUser(
    @Body() updateUser: Partial<User>,
    @Query('name') name: string,
  ): Promise<User> {
    return this.userService.updateUser(updateUser, name);
  }

  @Delete('delete/:name')
  async deleteUserByName(@Query('name') name: string): Promise<User | null> {
    return this.userService.deleteUserByName(name);
  }
}
