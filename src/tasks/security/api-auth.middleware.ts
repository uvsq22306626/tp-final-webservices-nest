import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class ApiAuthMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}

  use(req: Request, _res: Response, next: NextFunction) {
    console.log('MIDDLEWARE HIT:', req.method, req.originalUrl);
    const expectedToken = this.configService.get<string>('API_TOKEN');

    const authHeader = req.headers['authorization'];
    const token = Array.isArray(authHeader) ? authHeader[0] : authHeader;

    const bearer = token?.startsWith('Bearer ') ? token.slice(7) : null;

    if (!expectedToken) {
      throw new UnauthorizedException('API_TOKEN is not configured');
    }

    if (!bearer || bearer !== expectedToken) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    next();
  }
}
