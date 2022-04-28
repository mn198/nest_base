/* eslint-disable @typescript-eslint/ban-types */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function transformValue(doc, ret: { [key: string]: any }) {
  delete ret._id;
  delete ret.password;
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
export class User extends Document {
  @Prop({ enum: [null, 'google', 'facebook'] })
  provider: string;

  @Prop()
  providerId: string;

  @Prop()
  username: string;

  @Prop({ minlength: [6, 'Password should include at least 6 chars'] })
  password: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email should be valid',
    ],
  })
  email: string;

  @Prop()
  picture: string;

  @Prop()
  photos: string[];

  getEncryptedPassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.getEncryptedPassword = (
  password: string,
): Promise<string> => {
  return bcrypt.hash(String(password), SALT_ROUNDS);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await this.getEncryptedPassword(this.password);
  next();
});
