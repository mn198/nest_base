import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { slugify } from 'src/common/utils/slugify';

const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};

const editFileName = (req, file, callback) => {
  const name = slugify(file.originalname.split('.')[0]);
  const fileExtName = extname(file.originalname);
  callback(null, `${name}-${new Date().getTime()}${fileExtName}`);
};

@Controller('uploads')
export class UploadsController {
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './static/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadedFile(@UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
      path: '/static/images/' + file.filename,
    };
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Post('multiple')
  @UseInterceptors(
    FilesInterceptor('image', 20, {
      storage: diskStorage({
        destination: './static/images',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadMultipleFiles(@UploadedFiles() files) {
    const response = [];
    files.forEach((file) => {
      const fileReponse = {
        originalname: file.originalname,
        filename: file.filename,
        path: '/static/images/' + file.filename,
      };
      response.push(fileReponse);
    });
    return response;
  }
}
