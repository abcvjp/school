import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

export type UserRole = 'admin' | 'user';

@Schema()
export class User extends Document {
  @ApiProperty({
    description: 'The role of the User',
    enum: ['admin', 'user'],
  })
  @Prop({
    type: String,
    required: true,
    enum: ['user', 'admin'],
    default: 'user',
  })
  role: UserRole;

  @ApiProperty({
    description: 'Indicate whether the user is lock or not',
    example: true,
  })
  @Prop({
    type: String,
    required: true,
    default: true,
  })
  isEnabled: boolean;

  @ApiProperty({
    description: 'The full name of the User',
    example: 'Nguyen Van A',
  })
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'The email of the User',
    example: 'abc@ekoios.vn',
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @ApiProperty({
    description: 'The phone number of the User',
    example: '+84363123456',
  })
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

  @ApiProperty({
    description: 'The avatar url of the User',
    example: '/my-avatar.jpg',
  })
  @Prop({
    type: String,
  })
  avatar: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
