import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/utils/password';
import { MAILER_SERVICE } from 'src/workers/mailer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @Inject(MAILER_SERVICE) private readonly mailerService: ClientKafka,
  ) {}

  async findOne(id: string): Promise<IUser> {
    const foundUser = await this.userModel.findById(id).exec();
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async findAll(): Promise<IUser[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<IUser> {
    const foundUser = await this.userModel.findOne({ email }).exec();
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return foundUser;
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const { email, password, fullName, phoneNumber } = dto;

    // check uniqueness of email, phoneNumber
    const userByEmailOrPhoneNumber = await this.userModel
      .findOne({
        $or: [{ email }, { phoneNumber }],
      })
      .exec();
    if (userByEmailOrPhoneNumber) {
      throw new ConflictException('Email or phoneNumber is already registered');
    }

    const createdUser = await this.userModel.create({
      email,
      phoneNumber,
      fullName,
      passwordHash: await hashPassword(password),
    });

    return createdUser;
  }

  async update(id: string, dto: UpdateUserDto): Promise<IUser> {
    const existingUser = this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return existingUser;
  }

  async deleteOne(id: string): Promise<boolean> {
    const foundUser = await this.userModel.findById(id);
    if (!foundUser) {
      throw new NotFoundException('User not found');
    }
    return (await foundUser.delete()) && true;
  }
}
