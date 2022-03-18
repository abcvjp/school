import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { Public } from 'src/common/decorators/public.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserRole } from './schemas/user.schema';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('user')
@UseInterceptors(
  new SanitizeMongooseModelInterceptor({
    excludeMongooseId: false,
    excludeMongooseV: true,
  }),
)
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({
    description: 'Retrieve an User',
  })
  @ApiOkResponse({
    description: 'The found User',
    type: User,
  })
  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    description: 'Retrieve many User',
  })
  @ApiOkResponse({
    description: 'The found Users',
    type: [User],
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    description: 'Create a User',
  })
  @ApiCreatedResponse({
    description: 'The created User',
    type: User,
  })
  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Update an User',
  })
  @ApiOkResponse({
    description: 'The updated User',
    type: User,
  })
  @ApiBearerAuth()
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Delete an User',
  })
  @ApiOkResponse({
    description: 'The User has been delete successfully',
  })
  @ApiBearerAuth()
  @Roles(UserRole.Admin)
  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.userService.deleteOne(id);
  }
}
