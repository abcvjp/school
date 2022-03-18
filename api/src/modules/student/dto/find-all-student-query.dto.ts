import { IsInt, IsMongoId, IsOptional } from 'class-validator';
import { ValidateNumberFilter } from 'src/common/decorators/number-filter.decorator';
import { FindQueryDto } from 'src/common/dto/find-query.dto';
import { NumberFilter } from 'src/common/dto/number-filter.dto';

export class FindAllStudentQueryDto extends FindQueryDto {
  @IsOptional()
  @IsMongoId()
  readonly classId: string;

  @IsOptional()
  readonly className: string;

  @IsOptional()
  @ValidateNumberFilter()
  readonly age: NumberFilter;
}
