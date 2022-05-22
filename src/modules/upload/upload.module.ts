import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { Upload, UploadSchema } from './schemas/upload.schema';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
    MulterModule.register({
      dest: './static/images',
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
