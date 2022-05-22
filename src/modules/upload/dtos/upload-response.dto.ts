import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UploadResponseDto {
  @ApiProperty()
  @Expose()
  originalname: string;

  @ApiProperty()
  @Expose()
  filename: string;

  @ApiProperty()
  @Expose()
  path: string;
}
