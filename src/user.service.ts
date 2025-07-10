import {
  Injectable,
  NotFoundException,
  Inject,
  OnModuleInit,
  BadRequestException,
} from '@nestjs/common';
import { User } from './model/user.schema';
import { ClientGrpc } from '@nestjs/microservices';
import { UserDto } from './model/user.dto';
import { UserRepository } from './user.repository';
import { lastValueFrom, Observable } from 'rxjs';
@Injectable()
export class UserService implements OnModuleInit {
  private videoService: {
    findVideosByOwnerId(request: { id: string }): Observable<any>;
    testGrpc(request: { message: string }): Observable<any>;

    uploadVideo(request: {
      video: {
        id: string;
        title: string;
        description: string;
        url: string;
        tags: string[];
        owner: string;
        ageConstraint: number;
      };
    }): Observable<any>;
    addComment(request: { id: string; comment: string }): Observable<any>;
  };

  constructor(
    private readonly userRepository: UserRepository,
    @Inject('VIDEO_PACKAGE') private client: ClientGrpc,
  ) {}

  onModuleInit() {
    this.videoService = this.client.getService('VideoService');
    console.log('VideoService', this.videoService);
  }

  async getAll(): Promise<User[]> {
    const result = await this.userRepository.findAll();
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findByUserName(name: string): Promise<User | null> {
    const result = await this.userRepository.findByUserName(name);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }

  async findUserByEmail(request: { email: string }): Promise<{ user: User }> {
    const result = await this.userRepository.findByEmail(request.email);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    console.log(result);
    return { user: result };
  }

  async findUserById(request: { id: string }): Promise<{ user: User }> {
    const result = await this.userRepository.findById(request.id);
    if (!result) {
      console.log(request);
      console.log(result);
      throw new NotFoundException('Cannot find user');
    }
    console.log('succes');
    console.log(result);
    return { user: result };
  }

  async updateUser(updateUser: UserDto, id: string): Promise<User> {
    const updatedUser = await this.userRepository.update(id, updateUser);
    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }
    return updatedUser;
  }

  async createUser(user: User): Promise<{ user: User }> {
    const newUser = await this.userRepository.create(user);
    if (!newUser) {
      throw new BadRequestException('User already exists or missing field');
    }
    return { user: newUser };
  }

  async deleteUserById(id: string): Promise<User | null> {
    const result = await this.userRepository.deleteById(id);
    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
  // todo: find video

  async findVideosByOwnerId(request: { id: string }): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await lastValueFrom(
        this.videoService.findVideosByOwnerId(request),
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Video not found');
    }
  }

  async uploadVideo(video: {
    id: string;
    title: string;
    description: string;
    url: string;
    tags: string[];
    owner: string;
    ageConstraint: number;
  }): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await lastValueFrom(
        this.videoService.uploadVideo({ video }),
      );
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Video not found');
    }
  }

  async addComment(request: { id: string; comment: string }): Promise<any> {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = await lastValueFrom(this.videoService.addComment(request));
      return result;
    } catch (error) {
      console.log(error);
      throw new NotFoundException('Video not found');
    }
  }
}
