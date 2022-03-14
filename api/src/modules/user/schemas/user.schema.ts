import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserRole = 'admin' | 'seller' | 'user';

@Schema()
export class User extends Document {
  @Prop({
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: UserRole;

  @Prop({
    type: String,
    required: true,
    default: true,
  })
  isEnabled: boolean;

  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phoneNumber: string;

  @Prop({
    type: String,
  })
  @Exclude()
  passwordHash: string;

  @Prop({
    type: String,
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
