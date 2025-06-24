import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<UserDocument>) {}

  async getAll(): Promise<User[]> {
    return this.UserModel.find().exec();
  }

  async findByName(name: string): Promise<User | null> {
    return this.UserModel.findOne({ name: new RegExp(name, 'i') })
      .lean()
      .then((result) => result)
      .catch((error) => {
        // handle the error
        throw error;
      });
  }

  async updateUser(updateUser: Partial<User>, name: string): Promise<User> {
    const updatedUser = await this.UserModel.findOneAndUpdate(
      { name: new RegExp(name, 'i') },
      updateUser,
      { new: true },
    )
      .lean()
      .exec();

    if (!updatedUser) {
      throw new NotFoundException('User not found');
    }

    return updatedUser as User;
  }

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = new this.UserModel(user);
    return newUser.save();
  }

  async deleteUserByName(name: string): Promise<User | null> {
    const user = await this.findByName(name);
    if (!user) {
      throw new NotFoundException('User not found');
    } else {
      return this.UserModel.findOneAndDelete({ name: new RegExp(name, 'i') });
    }
  }
}
