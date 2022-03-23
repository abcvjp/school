import {
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { IStudent } from './interfaces/student.interface';
import { Student } from './schemas/student.schema';
import { FindAllStudentQueryDto } from './dto/find-all-student-query.dto';
import {
  DEFAULT_DBQUERY_LIMIT,
  DEFAULT_DBQUERY_SKIP,
  DEFAULT_DBQUERY_SORT,
} from 'src/common/constants';
import mongoose from 'mongoose';
import { ClassService } from '../class/class.service';
import { Logger } from 'src/logger/logger.decorator';
import { MyLogger } from 'src/logger/my-logger.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
    private readonly classService: ClassService,
    @Logger('StudentService') private readonly logger: MyLogger,
  ) {}

  async findOne(id: string): Promise<IStudent> {
    const foundStudent = await this.studentModel.findById(id).exec();
    if (!foundStudent) {
      throw new NotFoundException('Student not found');
    }
    return foundStudent;
  }

  async findAll(query: FindAllStudentQueryDto): Promise<IStudent[]> {
    const { startId, skip, limit, sort, classId, className, age } = query;

    const filters = [];
    startId && filters.push({ _id: { $gt: startId } });
    classId &&
      filters.push({ 'class._id': new mongoose.Types.ObjectId(classId) });
    className &&
      filters.push({ 'class.name': { $regex: new RegExp(className, 'i') } });
    age && filters.push({ age: age.toMongooseFilter() });

    const dbQuery = this.studentModel
      .aggregate()
      .match(filters.length === 0 ? {} : { $and: filters })
      .skip(skip ? skip : DEFAULT_DBQUERY_SKIP)
      .limit(limit ? limit : DEFAULT_DBQUERY_LIMIT)
      .project({
        _id: { $toString: '$_id' },
        fullName: 1,
        age: 1,
        className: '$class.name',
        classId: { $toString: '$class._id' },
      })
      .append({ $sort: sort ? sort : DEFAULT_DBQUERY_SORT });
    return await dbQuery.exec();
  }

  async create(dto: CreateStudentDto): Promise<IStudent> {
    const { fullName, age, classId } = dto;
    const existingClass = await this.classService.findOne(classId);
    if (!existingClass) {
      throw new NotFoundException('Class not found');
    }
    const createdStudent = await this.studentModel.create({
      fullName,
      age,
      class: existingClass,
    });
    return createdStudent;
  }

  async update(id: string, dto: CreateStudentDto): Promise<IStudent> {
    const existingStudent = await this.studentModel.findById(id);
    if (!existingStudent) {
      throw new NotFoundException('Student not found');
    }
    const { fullName, age, classId } = dto;
    if (classId !== existingStudent.class._id) {
      const newClass = await this.classService.findOne(classId);
      existingStudent.class = newClass;
    }
    Object.assign(existingStudent, { fullName, age });
    return await existingStudent.save();
  }

  async deleteOne(id: string) {
    const foundStudent = await this.studentModel.findById(id);
    if (!foundStudent) {
      throw new NotFoundException('Student not found');
    }
    return (await foundStudent.delete()) && true;
  }
}
