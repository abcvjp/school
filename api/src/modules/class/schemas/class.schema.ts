import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { IClass } from '../interfaces/class.interface';

@Schema({
  versionKey: false,
})
export class Class extends Document implements IClass {
  @ApiProperty({
    description: 'The name of the class',
    example: 'K63CC',
  })
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
