import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsEmail, IsEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';

@Exclude()
export class UpdateUserDto {
  @ApiProperty({ minLength: 4, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  displayName: string;

  @ApiProperty({ type: 'string' })
  @Expose()
  @IsString()
  @IsOptional()
  @MaxLength(128)
  picture: string | null;

  @ApiProperty({ maxLength: 128, type: 'string' })
  @Expose()
  @IsEmail()
  @IsOptional()
  @MaxLength(128)
  email: string | null;

  @ApiProperty({ type: [] })
  @Expose()
  @IsArray()
  @IsOptional()
  photos: [] | null;
}
