import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ unique: true })
  id: string;

  @Prop({ require: true })
  user_name: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  @Prop({ unique: true, index: true })
  email: string;

  @Prop()
  subscribers: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
