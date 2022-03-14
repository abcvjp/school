import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  MaxLength,
} from 'class-validator';
import { UserRole } from '../schemas/user.schema';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'abc@ekoios.vn',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @ApiProperty({
    description: 'The role of the User',
    enum: ['admin', 'user'],
    required: false,
  })
  @IsOptional()
  readonly role: UserRole;

  @ApiProperty({
    description: 'The full name of the User',
    example: 'Nguyen Van A',
  })
  @IsNotEmpty()
  @MaxLength(50)
  readonly fullName: string;

  @ApiProperty({
    description: 'The phone number of the User',
    example: '+84363123456',
  })
  @IsNotEmpty()
  @IsPhoneNumber()
  @Length(7, 15)
  readonly phoneNumber: string;
}
