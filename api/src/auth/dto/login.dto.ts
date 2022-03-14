import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the User',
    example: 'abc@ekoios.vn',
  })
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(50)
  readonly email: string;

  @ApiProperty({
    description: 'The password of the User',
    example: '123456aW@',
  })
  @IsNotEmpty()
  @Length(6, 32)
  readonly password: string;
}
