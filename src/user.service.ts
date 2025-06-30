import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from './model/user.schema';
import { ClientGrpc } from '@nestjs/microservices';
import { UserDto } from './model/user.dto';
import { UserRepository } from './user.repository';
import { lastValueFrom, Observable } from 'rxjs';
@Injectable()
export class UserService {
  private videoService: {
    findVideoByUserId(request: { id: string }): Observable<any>;
  };

  constructor(
    private readonly userRepository: UserRepository,
    @Inject('VIDEO_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.videoService = this.client.getService('VideoService');
  }

  async getAll(): Promise<User[]> {
    const result = await this.userRepository.findAll();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findByName(name: string): Promise<User | null> {
    const result = await this.userRepository.findByName(name);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const result = await this.userRepository.findByEmail(email);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findUserById(id: string | ObjectId): Promise<User | null> {
    const result = await this.userRepository.findById(id);
    if (!result) {
      throw new NotFoundException('Cannot find user');
    }
    return result;
  }

  async updateUser(updateUser: UserDto, id: string): Promise<User> {
    const updatedUser = await this.userRepository.update(id, updateUser);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    if (!newUser) {
      throw new NotFoundException('User not found');
    }
    return newUser;
  }

  async deleteUserById(id: string): Promise<User | null> {
    const result = await this.userRepository.deleteById(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
  // todo: find video

  async findVideoByUserId(id: string): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await lastValueFrom(
        this.videoService.findVideoByUserId({ id }),
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Video not found');
    }
  }
}
