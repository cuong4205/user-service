import { GrpcMethod, RpcException } from '@nestjs/microservices';
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
  async findUserByEmail(data: { email: string }): Promise<any> {
    const user = await this.userService.findUserByEmail(data);
    if (!user) {
      throw new RpcException('User not found');
    }

    return {
      id: String(user.user.id ?? ''),
      user_name: String(user.user.user_name ?? ''),
      email: String(user.user.email ?? ''),
      age: Number(user.user.age ?? 0),
      password: String(user.user.password ?? ''),
    };
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(user: User): Promise<{ user: User }> {
    return await this.userService.createUser(user);
  }
}
