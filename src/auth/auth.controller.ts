import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
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
import { UserLoginResponseDto } from './dtos/user-login-response.dto';
import { UserLoginDto } from './dtos/user-login.dto';
import { GoogleOauthGuard } from './guards/google-oauth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';

@Controller()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: UserLoginDto })
  @ApiOkResponse({ type: UserLoginResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid username or password' })
  async login(@CurrentUser() user: IUser) {
    return this.authService.login(user);
  }

  @Post('auth/refresh')
  @UseGuards(RefreshJwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserLoginResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async refresh(@CurrentUser() user: IUser) {
    return this.authService.refreshTokens(user.id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  getProfile(@CurrentUser() user: IUser) {
    return plainToInstance(ProfileResponseDto, user);
  }

  @Get('auth/google')
  @UseGuards(GoogleOauthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  googleAuth() {}

  @Get('auth/google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Request() req) {
    return this.authService.login(req.user);
  }
}
