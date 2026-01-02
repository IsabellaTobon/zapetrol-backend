import { Controller, Get, ServiceUnavailableException } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  keepServerAlive(): string {
    return this.appService.keepAlive();
  }

  @Get('uptime/users')
  async uptimeUsers(): Promise<{ ok: true }> {
    try {
      // lightweight DB read to keep the DB awake; do not expose data
      await this.usersService.ping();
      return { ok: true };
    } catch (err) {
      throw new ServiceUnavailableException('Database unreachable');
    }
  }
}
