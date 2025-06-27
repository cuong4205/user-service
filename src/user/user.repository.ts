import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
import { UserDto } from './model/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findById(id: string | ObjectId): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async findByName(name: string): Promise<User | null> {
    return this.userModel
      .findOne({ name: new RegExp(name, 'i') })
      .lean()
      .exec();
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userModel
      .findOne({ email: new RegExp(email, 'i') })
      .lean()
      .exec();
  }

  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, updateUser: Partial<UserDto>): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate(id, updateUser, { new: true })
      .lean()
      .exec();
  }

  async deleteById(id: string): Promise<User | null> {
    return this.userModel.findByIdAndDelete(id).lean().exec();
  }
}
