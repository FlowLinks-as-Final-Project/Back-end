import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, ObjectId } from 'mongoose';

import { Post } from 'src/post/schemas/post.schema';

export type UserDocument = HydratedDocument<User>;

export enum RoleType {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({ _id: false })
class FullNameInfo {
  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName?: string;
}

@Schema({ _id: false })
export class UserListInfo {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] })
  users: ObjectId[];

  @Prop({
    default: 0,
  })
  count?: number;
}

@Schema()
class Profile {
  @Prop(FullNameInfo)
  name: FullNameInfo;

  @Prop()
  bio?: string;

  @Prop()
  birthday?: Date;

  @Prop()
  profileImage?: string;

  @Prop({ default: true })
  isPublic: boolean;

  @Prop(UserListInfo)
  following: UserListInfo;

  @Prop(UserListInfo)
  followers: UserListInfo;

  @Prop(UserListInfo)
  requests: UserListInfo;

  @Prop(UserListInfo)
  blocks: UserListInfo;

  @Prop([Post])
  recentPosts: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  })
  savedPosts: Post[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  })
  posts: Post[];

  @Prop({
    default: 0,
  })
  postCount: number;
}

@Schema({ timestamps: true })
export class User {
  @Prop({
    trim: true,
    index: true,
    unique: true,
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    enum: RoleType,
    default: RoleType.USER,
  })
  role: RoleType;

  @Prop({
    trim: true,
    index: true,
    unique: true,
    sparse: true,
  })
  phoneNumber: string;

  @Prop({
    type: Profile,
    sparse: true,
  })
  profile?: Profile;
}

export const UserSchema = SchemaFactory.createForClass(User);
