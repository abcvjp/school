import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateClassDto } from './dto/create-class.dto';
import { IClass } from './interfaces/class.interface';
import { Class } from './schemas/class.schema';
import mongoose from 'mongoose';
import { Student } from '../student/schemas/student.schema';
import { FindAllClassQueryDto } from './dto/find-all-class-query.dto';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name) private readonly classModel: Model<Class>,
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    @InjectConnection() private readonly dbConnection: mongoose.Connection,
  ) {}

  async findOne(id: string): Promise<IClass> {
    const foundClass = await this.classModel.findById(id).exec();
    if (!foundClass) {
      throw new NotFoundException('Class not found');
    }
    return foundClass;
  }

  async findAll(query: FindAllClassQueryDto): Promise<IClass[]> {
    const { startId, skip, limit, sort } = query;
    const dbQuery = this.classModel
      .find(
        startId
          ? {
              _id: { $gt: startId },
            }
          : {},
      )
      .sort(sort ? sort : { _id: 1 })
      .skip(skip)
      .limit(limit);
    return await dbQuery.exec();
  }

  async create(dto: CreateClassDto): Promise<IClass> {
    const { name } = dto;
    const createdClass = await this.classModel.create({
      name,
    });
    return createdClass;
  }

  async update(id: string, dto: CreateClassDto): Promise<IClass> {
    const existingClass = await this.classModel.findById(id);
    if (!existingClass) {
      throw new NotFoundException('Class not found');
    }

    Object.assign(existingClass, dto);
    await existingClass.save();
    await this.studentModel.updateMany(
      { 'class._id': id },
      {
        $set: {
          class: existingClass,
        },
      },
    );

    // const session = await this.dbConnection.startSession();
    // session.startTransaction();
    // try {
    // await existingClass.update(dto).session(session)
    // await this.studentModel.updateMany(
    // { 'class._id': id },
    // {
    // $set: {
    // class: existingClass,
    // },
    // },
    // );
    // await session.commitTransaction();
    // } catch (error) {
    // await session.abortTransaction();
    // throw error;
    // } finally {
    // session.endSession();
    // }

    return existingClass;
  }

  async deleteOne(id: string): Promise<boolean> {
    const foundClass = await this.classModel.findById(id);
    if (!foundClass) {
      throw new NotFoundException('Class not found');
    }
    await foundClass.delete();
    await this.studentModel.deleteMany({ 'class._id': id });

    // const session = await this.dbConnection.startSession();
    // session.startTransaction();
    // try {
    // await foundClass.delete();
    // await this.studentModel.deleteMany({ 'class._id': id });
    // await session.commitTransaction();
    // } catch (error) {
    // await session.abortTransaction();
    // throw error;
    // } finally {
    // session.endSession();
    // }

    return true;
  }
}
