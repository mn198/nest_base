import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class RefreshTokenDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  refresh_token: string;
}
