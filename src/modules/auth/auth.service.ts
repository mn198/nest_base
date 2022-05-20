import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: any) {
    // const payload = {
    // displayName: user.displayName,
    // username: user.username,
    //   id: user._id,
    // };
    return this.generateTokens(user._id);
  }

  async generateTokens(userId: string) {
    const jwtPayload = {
      sub: userId,
    };
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('JWT_SECRET'),
        expiresIn: '30m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('REFRESH_JWT_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async refreshTokens(userId: string) {
    const tokens = await this.generateTokens(userId);
    return tokens;
  }

  verifyAccessToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.config.get('JWT_SECRET'),
      });

      return payload;
    } catch (err) {
      return null;
    }
  }

  verifyRefreshToken(accessToken: string) {
    try {
      const payload = this.jwtService.verify(accessToken, {
        secret: this.config.get('REFRESH_JWT_SECRET'),
      });

      return payload;
    } catch (err) {
      return null;
    }
  }
}
