import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassModule } from '../class/class.module';
import { Student, StudentSchema } from './schemas/student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    forwardRef(() => ClassModule),
  ],
  providers: [StudentService],
  controllers: [StudentController],
  exports: [StudentService, MongooseModule],
})
export class StudentModule {}
