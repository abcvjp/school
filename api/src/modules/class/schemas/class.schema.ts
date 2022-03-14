import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

@Schema()
export class Class extends Document {
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
