import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateClassDto {
  @IsNotEmpty()
  @MaxLength(10)
  readonly name: string;
}
