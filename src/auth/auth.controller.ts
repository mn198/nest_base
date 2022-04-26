import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';

import { AuthService } from './auth.service';
import { ProfileResponseDto } from './dtos/profile-response.dto';
import { UserLoginResponseDto } from './dtos/user-login-response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: UserLoginResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid username or password' })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@Request() req) {
    return plainToInstance(ProfileResponseDto, req.user);
  }

  @Get('auth/google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth(@Request() req) {}

  @Get('auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.login(req.user);
  }
}
