import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { IUser } from './interfaces/user.interface';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<IUser>,
  ) { }

  async create(user: IUser): Promise<IUser> {
    return this.userModel.create(user);
  }

  async findAll() {
    return this.userModel.find({}).exec();
  }

  async findOneByUsername(username: string): Promise<IUser> {
    return this.userModel.findOne({ username }).lean().exec();
  }

  async findOneById(id: string): Promise<IUser> {
    return this.userModel.findOne({ _id: id }).exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<IUser> {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      { $set: updateUserDto },
      { new: true },
    );
  }

  async remove(id: string): Promise<IUser> {
    return this.userModel.findOneAndRemove({ _id: id });
  }

  count() {
    return this.userModel.countDocuments().lean().exec();
  }
}
