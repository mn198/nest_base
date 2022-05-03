import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JWTToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers['authorization']
      ?.replace('Bearer', '')
      .trim();
    return token;
  },
);
