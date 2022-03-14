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
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateStudentDto } from './dto/create-student.dto';
import { FindAllStudentQueryDto } from './dto/find-all-student-query.dto';
import { Student } from './schemas/student.schema';
import { StudentService } from './student.service';

@ApiTags('student')
@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @ApiOperation({
    description: 'Retrieve a Student',
  })
  @ApiOkResponse({
    description: 'The found Student',
    type: Student,
  })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @ApiOperation({
    description: 'Retrieve many Students',
  })
  @ApiOkResponse({
    description: 'The found Students',
    type: [Student],
  })
  @Get()
  @Public()
  findAll(@Query() query: FindAllStudentQueryDto) {
    return this.studentService.findAll(query);
  }

  @ApiOperation({
    description: 'Create a Student',
  })
  @ApiCreatedResponse({
    description: 'The created Student',
    type: Student,
  })
  @ApiBearerAuth()
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @ApiOperation({
    description: 'Update a Student',
  })
  @ApiOkResponse({
    description: 'The updated Student',
    type: Student,
  })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: CreateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @ApiOperation({
    description: 'Delete a Student',
  })
  @ApiOkResponse({
    description: 'The user has been deleted successfully',
  })
  @ApiBearerAuth()
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.studentService.deleteOne(id);
  }
}
