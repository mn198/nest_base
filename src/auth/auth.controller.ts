import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiResponse,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { IUser } from 'src/user/interfaces/user.interface';

import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile-response.dto';
import { RefreshTokenDto } from './dtos/refresh-token.dto';
import { UserLoginResponseDto } from './dtos/user-login-response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: UserLoginResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid username or password' })
  async login(@CurrentUser() user: IUser) {
    return this.authService.login(user);
  }

  @Post('refresh')
  @ApiOkResponse({ type: UserLoginResponseDto })
  @ApiResponse({ status: 403, description: 'Invalid refresh token' })
  async refresh(@Body() body: RefreshTokenDto) {
    const data = this.authService.verifyRefreshToken(body.refresh_token);
    if (data) {
      return this.authService.refreshTokens(data.sub);
    }
    throw new ForbiddenException('Invalid refresh token');
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: IUser) {
    return plainToInstance(ProfileResponseDto, user);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.login(req.user);
  }
}
