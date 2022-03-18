import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Class, ClassSchema } from './schemas/class.schema';
import { ClassController } from './class.controller';
import { ClassService } from './class.service';
import { StudentModule } from '../student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    forwardRef(() => StudentModule),
  ],
  providers: [ClassService],
  controllers: [ClassController],
  exports: [ClassService, MongooseModule],
})
export class ClassModule {}
