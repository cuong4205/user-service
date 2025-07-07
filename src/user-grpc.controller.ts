import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { User } from './model/user.schema';

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'FindUserById')
  async findUserById(request: { id: string }): Promise<{ user: User }> {
    return await this.userService.findUserById(request);
  }

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(request: { email: string }): Promise<{ user: User }> {
    return await this.userService.findUserByEmail(request);
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(user: User): Promise<{ user: User }> {
    return await this.userService.createUser(user);
  }
}
