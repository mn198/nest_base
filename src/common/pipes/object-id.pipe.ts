import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<any> {
  async transform(value: any) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid object id');
    }
    return value;
  }
}
