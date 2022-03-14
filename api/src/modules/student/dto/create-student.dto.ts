import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    description: 'The full name of the Student',
    example: 'Nguyen Van A',
  })
  @IsNotEmpty()
  @MaxLength(50)
  readonly fullName: string;

  @ApiProperty({
    description: 'The age of the Student',
    example: 18,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly age: number;

  @ApiProperty({
    description: 'The id of the class in which the Student study',
    example: '622b04774203cd6edcbb3c1e',
  })
  @IsNotEmpty()
  @IsMongoId()
  readonly classId: string;
}
