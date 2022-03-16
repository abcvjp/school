import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { ClassService } from './class.service';
import { FindAllClassQueryDto } from './dto/find-all-class-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Class } from './schemas/class.schema';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../user/schemas/user.schema';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';

@ApiTags('class')
@Controller('class')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
export class ClassController {
  constructor(private classService: ClassService) {}

  @ApiOperation({
    description: 'Retrieve a Class',
  })
  @ApiOkResponse({
    description: 'The found Class',
    type: Class,
  })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @ApiOperation({
    description: 'Retrieve many Class',
  })
  @ApiOkResponse({
    description: 'The found Classes',
    type: [Class],
  })
  @Get()
  @Public()
  findAll(@Query() query: FindAllClassQueryDto) {
    return this.classService.findAll(query);
  }

  @ApiOperation({
    description: 'Create a Class',
  })
  @ApiCreatedResponse({
    description: 'The created Class',
    type: Class,
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Post()
  create(@Body() createClassDto: CreateClassDto) {
    return this.classService.create(createClassDto);
  }

  @ApiOperation({
    description: 'Update a Class',
  })
  @ApiOkResponse({
    description: 'The updated Class',
    type: Class,
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateClassDto: CreateClassDto) {
    return this.classService.update(id, updateClassDto);
  }

  @ApiOperation({
    description: 'Delete a Class',
  })
  @ApiOkResponse({
    description: 'The Class has been deleted successfully',
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.classService.deleteOne(id);
  }
}
