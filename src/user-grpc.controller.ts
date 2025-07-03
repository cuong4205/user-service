import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Controller } from '@nestjs/common';
import { User } from './model/user.schema';

@Controller()
export class UserGrpcController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'FindUserById')
  async findUserById(request: { id: string }): Promise<{ user: User }> {
    return this.userService.findUserById(request);
  }
}
