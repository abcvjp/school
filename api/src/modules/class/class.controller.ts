import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassService } from './class.service';
import { FindAllClassQueryDto } from './dto/find-all-class-query.dto';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('class')
export class ClassController {
  constructor(private classService: ClassService) {}

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindAllClassQueryDto) {
    return this.classService.findAll(query);
  }

  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: CreateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.classService.deleteOne(id);
  }
}
