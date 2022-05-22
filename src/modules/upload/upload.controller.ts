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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { slugify } from 'src/common/utils/slugify';
import { Roles } from 'src/rbac/role.decorator';
import { Role } from 'src/rbac/role.enum';
import { RolesGuard } from 'src/rbac/roles.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UploadResponseDto } from './dtos/upload-response.dto';
import { UploadService } from './upload.service';

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

const imageConfig = {
  storage: diskStorage({
    destination: './static/images',
    filename: editFileName,
  }),
  fileFilter: imageFileFilter,
};

const fileSchema = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

const multipleFilesSchema = {
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  },
};

@Controller('uploads')
@ApiTags('uploads')
export class UploadController {
  constructor(private uploadService: UploadService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody(fileSchema)
  @ApiOkResponse({ type: UploadResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Empty file | Only image files are allowed!',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(FileInterceptor('file', imageConfig))
  async uploadedFile(@UploadedFile() file) {
    if (!file) {
      throw new BadRequestException('Empty file');
    }
    const data = await this.uploadService.create(file);
    return plainToInstance(UploadResponseDto, data);
  }

  @Post('multiple')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody(multipleFilesSchema)
  @ApiOkResponse({ type: UploadResponseDto })
  @ApiResponse({
    status: 400,
    description: 'Empty file | Only image files are allowed!',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @UseInterceptors(FilesInterceptor('file', 20, imageConfig))
  async uploadMultipleFiles(@UploadedFiles() files) {
    if (!files || !files.length) {
      throw new BadRequestException('Empty file');
    }
    const data = await this.uploadService.createMany(files);
    return plainToInstance(UploadResponseDto, data);
  }
}
