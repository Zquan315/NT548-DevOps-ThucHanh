import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Student extends Document {
  @Prop({ required: true })
  declare id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  major: string;

  @Prop({ required: false })
  GPA: number;

  @Prop({ required: false })
  subjects: { name: string; score: number }[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
