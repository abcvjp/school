import { IsInt, IsMongoId, IsNotEmpty, MaxLength, Min } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @MaxLength(50)
  readonly fullName: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly age: number;

  @IsNotEmpty()
  @IsMongoId()
  readonly classId: string;
}
