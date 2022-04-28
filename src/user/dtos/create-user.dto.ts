import { IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @ApiProperty({ minLength: 4, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  username: string;

  @ApiProperty({ minLength: 8, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @ApiProperty({ minLength: 8, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  displayName: string;
}
