import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Class, ClassSchema } from 'src/modules/class/schemas/class.schema';

@Schema()
export class Student extends Document {
  @Prop({
    type: String,
    required: true,
  })
  fullName: string;

  @Prop({
    type: Number,
    required: true,
    min: 1,
  })
  age: number;

  @Prop({
    type: ClassSchema,
    required: true,
  })
  class: Class;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
