import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { ObjectId } from 'mongoose';
import { User } from './model/user.schema';
import { ClientGrpc } from '@nestjs/microservices';
import { UserDto } from './model/user.dto';
import { UserRepository } from './user.repository';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private videoService: {
    findVideoByUserId(request: { id: ObjectId }): Observable<any>;
  };

  constructor(
    private readonly userRepository: UserRepository,
    @Inject('VIDEO_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.videoService = this.client.getService('VideoService');
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  async findByName(name: string): Promise<User | null> {
    try {
      const result = await this.userRepository.findByName(name);
      if (!result) throw new NotFoundException('User not found');
      return result;
    } catch (error) {
      console.error('Error in findByName:', error);
      throw error;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      const result = await this.userRepository.findByEmail(email);
      if (!result) throw new NotFoundException('User not found');
      return result;
    } catch (error) {
      console.error('Error in findUserByEmail:', error);
      throw error;
    }
  }

  async findById(id: string | ObjectId): Promise<User | null> {
    const result = await this.userRepository.findById(id);
    if (!result) {
      throw new NotFoundException('Cannot find user');
    }
    return result;
  }

  async updateUser(updateUser: UserDto, id: string): Promise<User> {
    try {
      const updatedUser = await this.userRepository.update(id, updateUser);
      if (!updatedUser) {
        throw new NotFoundException('User not found');
      }
      return updatedUser;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw error;
    }
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = await this.userRepository.create(user);
    if (!newUser) {
      throw new NotFoundException('User not found');
    }
    return newUser;
  }

  async deleteUserById(id: string): Promise<User | null> {
    return this.userRepository.deleteById(id);
  }
  // todo: find video
}