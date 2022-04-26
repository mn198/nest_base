import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsString, MaxLength, MinLength } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @ApiProperty({ minLength: 8, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  displayName: string;

  @ApiProperty({ maxLength: 128, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MaxLength(128)
  picture: string;

  @ApiProperty({ type: [] })
  @Expose()
  @IsArray()
  photos: string;
}
