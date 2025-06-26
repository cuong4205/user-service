import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/user/model/schema/user.schema';

export type VideoDocument = Video & Document;

@Schema({ timestamps: true })
export class Video {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  url: string;

  @Prop()
  comment: string[]; 

  @Prop()
  tags: string[];

  @Prop()
  ageConstraint: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  owner: User;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
