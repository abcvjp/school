import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({
    description: 'The name of the class',
    example: 'K63CC',
  })
  @IsNotEmpty()
  @MaxLength(10)
  readonly name: string;
}
