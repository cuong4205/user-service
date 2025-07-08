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
import { Observable } from 'rxjs';
import { UserDto } from './model/user.dto';

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
  async findUserByEmail(
    @Query('email') email: string,
  ): Promise<{ user: User }> {
    try {
      return await this.userService.findUserByEmail({ email });
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      throw error;
    }
  }
  @Get('find/byId')
  async findUserById(@Query('id') id: string): Promise<{ user: User }> {
    try {
      const result = await this.userService.findUserById({ id });
      return result;
    } catch (error) {
      console.error('Error find user:', error);
      throw error;
    }
  }

  @Post('create')
  async createUser(@Body() user: User): Promise<{ user: User }> {
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
  async deleteUserById(@Query('id') id: string): Promise<User | null> {
    try {
      return await this.userService.deleteUserById(id);
    } catch (error) {
      console.error('Error in deleteUserById:', error);
      throw error;
    }
  }

  @Get('video/id')
  async findVideosByOwnerId(@Query('id') id: string): Promise<any> {
    try {
      return await this.userService.findVideosByOwnerIdGrpc({ id });
    } catch (error) {
      console.error('Error in findVideoByUserId:', error);
      throw error;
    }
  }

  @Post('video')
  async uploadVideo(
    @Body()
    video: {
      id: string;
      title: string;
      description: string;
      url: string;
      tags: string[];
      owner: string;
      ageConstraint: number;
    },
  ): Promise<any> {
    try {
      return await this.userService.uploadVideo(video);
    } catch (error) {
      console.error('Error in uploadVideo:', error);
      throw error;
    }
  }
}
