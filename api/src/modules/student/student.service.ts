import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery } from 'mongoose';
import { Class } from '../class/schemas/class.schema';
import { CreateStudentDto } from './dto/create-student.dto';
import { IStudent } from './interfaces/student.interface';
import { Student } from './schemas/student.schema';
import mongoose from 'mongoose';
import { FindAllStudentQueryDto } from './dto/find-all-student-query.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
  ) {}

  async findOne(id: string): Promise<IStudent> {
    const foundStudent = await this.studentModel.findById(id).exec();
    if (!foundStudent) {
      throw new NotFoundException('Student not found');
    }
    return foundStudent;
  }

  async findAll(query: FindAllStudentQueryDto): Promise<IStudent[]> {
    const { startId, skip, limit, sort, classId, className } = query;

    const filters: FilterQuery<Class> = startId
      ? {
          _id: { $gt: startId },
        }
      : {};
    classId && (filters['class._id'] = classId);
    className && (filters['class.name'] = className);

    const dbQuery = this.studentModel
      .find(filters)
      .sort(sort ? sort : { _id: 1 })
      .skip(skip)
      .limit(limit);
    return await dbQuery.exec();
  }

  async create(dto: CreateStudentDto): Promise<IStudent> {
    const { fullName, age, classId } = dto;
    const existingClass = await this.classModel.findById(classId);
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
      const newClass = await this.classModel.findById(classId);
      if (!newClass) {
        throw new NotFoundException('Class not found');
      }
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
