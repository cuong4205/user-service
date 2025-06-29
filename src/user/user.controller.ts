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

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('all')
  async getAll(): Promise<User[]> {
    try {
      return await this.userService.getAll();
    } catch (error) {
      console.error('Error in getAll:', error);
      throw error;
    }
  }

  @Get('find/byName')
  async findByName(@Query('name') name: string): Promise<User | null> {
    try {
      return await this.userService.findByName(name);
    } catch (error) {
      console.error('Error in findByName:', error);
      throw error;
    }
  }

  @Get('find/byEmail')
  async findUserByEmail(@Query('email') email: string): Promise<User | null> {
    try {
      return await this.userService.findUserByEmail(email);
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      throw error;
    }
  }

  @GrpcMethod('UserService', 'FindUserById')
  @Get('find/byId')
  async findUserById(@Query('id') id: string): Promise<User | null> {
    try {
      const result = await this.userService.findUserById(id);
      return result;
    } catch (error) {
      console.error('Error in findUserById:', error);
      throw error;
    }
  }

  @Post('create')
  async createUser(@Body() user: UserDto): Promise<User> {
    try {
      return await this.userService.createUser(user);
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
  }

  @Put('update')
  async updateUser(
    @Body() updateUser: UserDto,
    @Query('id') id: string,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(updateUser, id);
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  }

  @Delete('delete')
  async deleteUserById(@Query('name') id: string): Promise<User | null> {
    try {
      return await this.userService.deleteUserById(id);
    } catch (error) {
      console.error('Error in deleteUserById:', error);
      throw error;
    }
  }
}
