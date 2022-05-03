import { IsString, MinLength, MaxLength, NotContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateUserDto {
  @ApiProperty({ minLength: 4, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @MinLength(4)
  @MaxLength(32)
  @NotContains(' ', { message: 'username should not contain a space' })
  username: string;

  @ApiProperty({ minLength: 8, maxLength: 32, required: true, type: 'string' })
  @Expose()
  @IsString()
  @NotContains(' ', { message: 'password should not contain a space' })
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
