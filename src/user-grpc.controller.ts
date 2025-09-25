import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { User } from './model/user.schema';
import { NotificationProducer } from './kafka/notification.producer';

@Controller()
export class UserGrpcController {
  constructor(
    private readonly userService: UserService,
    private readonly notificationProducer: NotificationProducer,
  ) {}

  @GrpcMethod('UserService', 'FindUserById')
  async findUserById(request: { id: string }): Promise<{ user: User }> {
    return await this.userService.findUserById(request);
  }

  @GrpcMethod('UserService', 'FindUserByEmail')
  async findUserByEmail(data: { email: string }): Promise<any> {
    const user = await this.userService.findUserByEmail(data);
    if (user) {
      return {
        id: String(user.user.id ?? ''),
        user_name: String(user.user.user_name ?? ''),
        email: String(user.user.email ?? ''),
        age: Number(user.user.age ?? 0),
        password: String(user.user.password ?? ''),
      };
    }
  }

  @GrpcMethod('UserService', 'CreateUser')
  async createUser(user: User): Promise<{ user: User }> {
    console.log('grpc user', user);
    this.notificationProducer.emitSendEmail(
      user.email,
      `Welcome ${user.user_name}, your account has been created successfully!`,
    );
    return await this.userService.createUser(user);
  }
}
