import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
}

export const VideoSchema = SchemaFactory.createForClass(Video);
