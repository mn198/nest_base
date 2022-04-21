import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  async use(req: Request, res: any, next: () => void) {
    next();
  }
}
