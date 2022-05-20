import { IsString, MaxLength, MinLength, NotContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserLoginDto {
  @Expose()
  @IsString()
  @NotContains(' ', { message: 'username should not contain a space' })
  @MinLength(4)
  @MaxLength(32)
  @ApiProperty({
    example: 'ajanuw',
    description: 'username',
    minLength: 4,
    maxLength: 32,
  })
  username: string;

  @Expose()
  @IsString()
  @NotContains(' ', { message: 'password should not contain a space' })
  @MinLength(8)
  @MaxLength(32)
  @ApiProperty({
    example: '12345678',
    description: 'password',
    minLength: 8,
    maxLength: 32,
  })
  password: string;
}
