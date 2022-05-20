import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUser } from 'src/modules/user/interfaces/user.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as IUser;
  },
);
