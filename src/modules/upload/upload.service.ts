import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUpload } from './interfaces/upload.interface';
import { Upload } from './schemas/upload.schema';

@Injectable()
export class UploadService {
  constructor(@InjectModel(Upload.name) private uploadModel: Model<IUpload>) {}

  async create(data: IUpload): Promise<IUpload> {
    return this.uploadModel.create(data);
  }

  async createMany(data: [IUpload]): Promise<any> {
    return this.uploadModel.insertMany(data);
  }
}
