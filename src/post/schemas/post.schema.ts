import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ _id: false })
class UserListInfo {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: ObjectId[];

  @Prop({
    default: 0,
  })
  count?: number;
}

@Schema({ _id: false })
class ProfileInfo {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, default: true })
  isPublic: boolean;
}

@Schema({ timestamps: true })
class Comment {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  userId: ObjectId;

  @Prop({ required: true })
  body: string;

  @Prop({
    default: false,
  })
  isEdited: boolean;

  @Prop(UserListInfo)
  likes: UserListInfo;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    sparse: true,
  })
  replies: Comment[];
}

@Schema({ timestamps: true })
export class Post {
  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  })
  ownerId: ObjectId;

  @Prop()
  caption: string;

  @Prop()
  media: string;

  @Prop({
    default: false,
  })
  isEdited: boolean;

  @Prop(ProfileInfo)
  profileInfo: ProfileInfo;

  @Prop(UserListInfo)
  likes: UserListInfo;

  @Prop({
    type: Comment,
    sparse: true,
  })
  comments: Comment[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
