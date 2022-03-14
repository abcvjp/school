import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @Length(6, 32)
  readonly password: string;

  @IsNotEmpty()
  @MaxLength(50)
  readonly fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Length(7, 15)
  readonly phoneNumber: string;
}
