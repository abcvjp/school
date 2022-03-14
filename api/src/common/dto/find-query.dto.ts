import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsOptional, IsString } from 'class-validator';

export class FindQueryDto {
  @ApiProperty({
    description: 'Id of the first record to find from',
    example: '622da3f610a1d746c1204725',
    required: false,
  })
  @IsOptional()
  @IsMongoId()
  readonly startId?: string;

  @ApiProperty({
    description: 'Number of record to be skipped',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  readonly skip: number;

  @ApiProperty({
    description: 'Number of record to be retrieved',
    example: 5,
    required: false,
  })
  @IsOptional()
  @IsInt()
  readonly limit: number;

  @ApiProperty({
    description: 'Fields to sort by',
    example: '+_id -name',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly sort: string;
}
