import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
  BadRequestException,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './model/user.schema';
import { UserDto } from './model/user.dto';
import { JwtRemoteAuthGuard } from './jwt-remote-auth.guard';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@UseFilters(HttpExceptionFilter)
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
  async findByUserName(@Query('name') name: string): Promise<User | null> {
    try {
      return await this.userService.findByUserName(name);
    } catch (error) {
      console.error('Error in findByName:', error);
      throw error;
    }
  }

  @Get('find/byEmail')
  async findUserByEmail(
    @Query('email') email: string,
    @Request() req,
  ): Promise<{ user: User } | null> {
    try {
      console.log(req);
      return await this.userService.findUserByEmail({ email });
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      console.log(req);
      throw error;
    }
  }

  @UseGuards(JwtRemoteAuthGuard)
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

  @UseGuards(JwtRemoteAuthGuard)
  @Put('update')
  async updateUser(
    @Body() updateUser: UserDto,
    @Query('id') id: string,
    @Request()
    req: Request & { user: { id: string; email: string; age: number } },
  ): Promise<User> {
    if (req.user.id !== id) {
      throw new UnauthorizedException(
        'You can only update your own user information',
      );
    }

    try {
      return await this.userService.updateUser(updateUser, id);
    } catch (error) {
      console.error('Error in updateUser:', error);
      throw error;
    }
  }

  @UseGuards(JwtRemoteAuthGuard)
  @Delete('delete')
  async deleteUserById(
    @Query('id') id: string,
    @Request()
    req: Request & { user: { id: string; email: string; age: number } },
  ): Promise<User | null> {
    if (req.user.id !== id) {
      throw new UnauthorizedException(
        'You can only delete your own user information',
      );
    }
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
      return await this.userService.findVideosByOwnerId({ id });
    } catch (error) {
      console.error('Error in findVideoByUserId:', error);
      throw error;
    }
  }

  @UseGuards(JwtRemoteAuthGuard)
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
    @Request()
    req: Request & { user: { id: string; email: string; age: number } },
  ): Promise<any> {
    if (video.ageConstraint > req.user.age) {
      throw new BadRequestException(
        'You are not allowed to upload videos with age constraints higher than your age',
      );
    }
    try {
      console.log(req.user);
      console.log(`upload video: `, video);
      return await this.userService.uploadVideo(video);
    } catch (error) {
      console.error('Error in uploadVideo:', error);
      throw error;
    }
  }

  @UseGuards(JwtRemoteAuthGuard)
  @Put('comment')
  async addComment(
    @Body() request: { id: string; comment: string },
  ): Promise<any> {
    try {
      return await this.userService.addComment(request);
    } catch (error) {
      console.error('Error in addComment:', error);
      throw error;
    }
  }

  @UseGuards(JwtRemoteAuthGuard)
  @Put('subscribe')
  async subscribe(
    @Query('email') email: string,
    @Request()
    req: Request & { user: { id: string; email: string; age: number } },
  ): Promise<void> {
    try {
      return await this.userService.subscribe(email, req.user.email);
    } catch (error) {
      console.error('Please check the email you provide', error);
      throw error;
    }
  }
}
