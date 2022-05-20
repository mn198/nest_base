import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { UserLoginDto } from '../dtos/user-login.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const data = {
      username,
      password,
    };

    // validate credentials
    const object = plainToInstance(UserLoginDto, data);
    const errors = await validate(object);
    if (errors.length) {
      const errMessageArr = [];
      errors.forEach((error) => {
        for (const msg of Object.values(error.constraints)) {
          errMessageArr.push(msg);
        }
      });
      throw new BadRequestException(errMessageArr);
    }

    // validate user
    const user = await this.authService.validateUser(
      object.username,
      object.password,
    );
    if (!user) {
      throw new BadRequestException('Invalid username or password');
    }
    return user;
  }
}
