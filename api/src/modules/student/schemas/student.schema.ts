import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { Class, ClassSchema } from 'src/modules/class/schemas/class.schema';

@Schema({
  versionKey: false,
})
export class Student extends Document {
  @ApiProperty({
    description: 'The full name of the Student',
    example: 'Nguyen Van A',
  })
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @ApiProperty({
    description: 'The age of the Student',
    example: 18,
  })
  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  age: number;

  @ApiProperty({
    description: 'The Class in which the Student study',
    type: Class,
  })
  @Prop({
    type: ClassSchema,
    required: true,
  })
  class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
