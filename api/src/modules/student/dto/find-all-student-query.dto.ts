import { IsMongoId, IsOptional } from 'class-validator';
import { FindQueryDto } from 'src/common/dto/find-query.dto';

export class FindAllStudentQueryDto extends FindQueryDto {
  @IsOptional()
  @IsMongoId()
  readonly classId: string;

  @IsOptional()
  readonly className: string;
}
