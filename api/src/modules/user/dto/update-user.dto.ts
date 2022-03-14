import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(50)
  readonly fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @Length(7, 15)
  readonly phoneNumber: string;
}
