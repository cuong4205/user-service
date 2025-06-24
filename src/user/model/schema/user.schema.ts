import { Schema, Prop, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop(
    raw({
      city: String,
      street: String,
      house: Number,
    }),
  )
  address: object;
}

export const UserSchema = SchemaFactory.createForClass(User);
