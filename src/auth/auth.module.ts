// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';

/** Parse '1d', '2h', '30m', '45s', '7w' -> seconds */
function parseDurationToSeconds(raw: string): number {
  const m = /^(\d+)\s*([smhdw])?$/i.exec(raw.trim());
  if (!m) return 24 * 60 * 60; // fallback 1d
  const value = Number(m[1]);
  const unit = (m[2] || 's').toLowerCase();
  switch (unit) {
    case 's': return value;
    case 'm': return value * 60;
    case 'h': return value * 60 * 60;
    case 'd': return value * 60 * 60 * 24;
    case 'w': return value * 60 * 60 * 24 * 7;
    default:  return 24 * 60 * 60;
  }
}

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const raw = cfg.get<string>('JWT_EXPIRES') ?? '1d';
        const expiresIn = parseDurationToSeconds(raw); // number (seconds)

        return {
          secret: cfg.get<string>('JWT_SECRET') ?? 'change-me',
          signOptions: { expiresIn },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
