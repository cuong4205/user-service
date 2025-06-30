import { Document, Schema as MongooseSchema } from 'mongoose';
export type VideoDocument = Video & Document;
export declare class Video {
    id: string;
    title: string;
    description: string;
    url: string;
    comment: string[];
    tags: string[];
    ageConstraint: number;
    owner: string;
    viewCount: number;
}
export declare const VideoSchema: MongooseSchema<Video, import("mongoose").Model<Video, any, any, any, Document<unknown, any, Video, any> & Video & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Video, Document<unknown, {}, import("mongoose").FlatRecord<Video>, {}> & import("mongoose").FlatRecord<Video> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
