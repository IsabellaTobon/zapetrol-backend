import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwt: JwtService,
    private cfg: ConfigService,
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const auth = req.headers.authorization as string;
    if (!auth || !auth.startsWith('Bearer '))
      throw new UnauthorizedException('Falta token');
    const token = auth.split(' ')[1];
    try {
      req.user = this.jwt.verify(token, {
        secret: this.cfg.get<string>('JWT_SECRET'),
      });
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
