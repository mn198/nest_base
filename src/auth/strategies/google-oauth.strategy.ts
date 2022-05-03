import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GoogleOauthStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly userService: UserService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOCLE_CALLBACK,
      scope: ['email', 'profile'],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;
    const user = await this.userService.findOne({
      provider: 'google',
      providerId: id,
    });
    if (!user) {
      return await this.userService.create({
        provider: 'google',
        providerId: id,
        displayName: name.givenName + ' ' + name.familyName,
        email: emails[0].value,
        username: emails[0].value,
        password: null,
        picture: null,
        photos: null,
      });
    }
    return user;
  }
}
