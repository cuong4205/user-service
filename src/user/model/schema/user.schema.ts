import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Video } from 'src/video/model/video.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User {
  @Prop({ require: true })
  user_name: string;

  @Prop()
  age: number;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop()
  videos: Video[];

}

export const UserSchema = SchemaFactory.createForClass(User);
