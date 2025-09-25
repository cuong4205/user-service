/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './model/user.schema';
import { UserDto } from './model/user.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel('Counter') private readonly counterModel: Model<any>,
  ) {}

  async getNextSequence(name: string): Promise<number> {
    const updated = await this.counterModel.findOneAndUpdate(
      { _id: name }, // Use _id instead of findByIdAndUpdate
      { $inc: { seq: 1 } },
      {
        upsert: true,
        new: true,
        // Add these options for better atomicity
      },
    );
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return updated.seq;
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUId(id: string): Promise<User | null> {
    return this.userModel.findOne({ id }).lean().exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).lean().exec();
  }

  async findByUserName(name: string): Promise<User | null> {
    return this.userModel
      .findOne({ user_name: new RegExp(name, 'i') })
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
    user.id = `u${await this.getNextSequence('users')}`;
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async update(id: string, updateUser: UserDto): Promise<User | null> {
    return this.userModel
      .findOneAndUpdate({ id }, updateUser, { new: true })
      .exec();
  }

  async deleteById(id: string): Promise<User | null> {
    return this.userModel.findOneAndDelete({ id }).lean().exec();
  }

  async subscribe(email: string, subscriber: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      await this.userModel.findOneAndUpdate(
        { email: email },
        { $push: { subscribers: subscriber } },
      );
    } else {
      throw new Error('Email invalid');
    }
  }
}
