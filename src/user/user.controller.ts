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
import { User } from './model/user.schema';
import { UserDto } from './model/user.dto';
import { GrpcMethod } from '@nestjs/microservices';
import { Types, ObjectId } from 'mongoose';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @Get('find/byName')
  async findByName(@Query('name') name: string): Promise<User | null> {
    return this.userService.findByName(name);
  }

  @Get('find/byEmail')
  async findUserByEmail(@Query('email') email: string): Promise<User | null> {
    return this.userService.findUserByEmail(email);
  }

  @GrpcMethod('UserService', 'FindUserById')
  @Get('find/byId')
  async findById(@Query('id') id: string): Promise<User | null> {
    return await this.userService.findById(Types.ObjectId(id));
  }

  @Post('create')
  async createUser(@Body() user: UserDto): Promise<User> {
    return this.userService.createUser(user);
  }

  @Put('update')
  async updateUser(
    @Body() updateUser: UserDto,
    @Query('id') id: string,
  ): Promise<User> {
    return this.userService.updateUser(updateUser, id);
  }

  @Delete('delete')
  async deleteUserById(@Query('name') id: string): Promise<User | null> {
    return this.userService.deleteUserById(id);
  }
}
