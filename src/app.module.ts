// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        const url = cfg.get<string>('DATABASE_URL')!;

        return {
          type: 'postgres',
          url,
          // 👇 Para DEV: no verificar el certificado
          ssl: { rejectUnauthorized: false },
          extra: {
            ssl: { rejectUnauthorized: false },
          },
          autoLoadEntities: true,
          synchronize: true, // solo desarrollo
        };
      },
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
