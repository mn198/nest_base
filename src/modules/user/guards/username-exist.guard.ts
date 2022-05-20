import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class UsernameExistGuard implements CanActivate {
  constructor(private userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const body = context.switchToHttp().getRequest().body;
    const data = await this.userService.findOneByUsername(body.username);
    if (data) {
      throw new ConflictException('Account with this username already exists');
    }
    return true;
  }
}
