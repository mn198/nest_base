import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
}

@Schema({
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: transformValue,
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: transformValue,
  },
  timestamps: true,
})
export class Upload extends Document {
  @Prop({ type: String })
  fieldname: string;

  @Prop({ type: String })
  originalname: string;

  @Prop({ type: String })
  encoding: string;

  @Prop({ type: String })
  mimetype: string;

  @Prop({ type: String })
  destination: string;

  @Prop({ type: String })
  filename: string;

  @Prop({ type: String })
  path: string;

  @Prop({ type: Number })
  size: number;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
