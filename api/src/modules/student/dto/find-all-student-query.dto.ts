import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsOptional } from 'class-validator';
import { ValidateNumberFilter } from 'src/common/decorators/number-filter.decorator';
import { FindQueryDto } from 'src/common/dto/find-query.dto';
import { NumberFilter } from 'src/common/dto/number-filter.dto';

export class FindAllStudentQueryDto extends FindQueryDto {
  @ApiProperty({
    description: 'The id of class in which students study',
    example: '622da3f610a1d746c1204725',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  readonly classId: string;

  @ApiProperty({
    description: 'The name of class in which students study',
    example: '12A1',
    required: false,
  })
  @IsOptional()
  readonly className: string;

  @ApiProperty({
    description:
      'The age of the students. It can also come with [eq], [ne], [gt], [lt], [gte], [lte]; example: age[gte]=18',
    example: 18,
    required: false,
    type: Number,
  })
  @IsOptional()
  @ValidateNumberFilter()
  readonly age: NumberFilter;
}
