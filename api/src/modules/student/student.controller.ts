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
import { Public } from 'src/common/decorators/public.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindAllStudentQueryDto } from './dto/find-all-student-query.dto';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Get()
  @Public()
  findAll(@Query() query: FindAllStudentQueryDto) {
    return this.studentService.findAll(query);
  }

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.studentService.deleteOne(id);
  }
}
