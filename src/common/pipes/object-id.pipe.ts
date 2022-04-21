import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!Types.ObjectId.isValid(value)) {
      throw new BadRequestException('Invalid object id');
    }
    return value;
  }
}
