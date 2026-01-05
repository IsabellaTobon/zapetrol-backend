<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { Controller, Get } from '@nestjs/common';
=======
import { Controller, Get, Post, Body, ServiceUnavailableException } from '@nestjs/common';
>>>>>>> Stashed changes
=======
import { Controller, Get, Post, Body, ServiceUnavailableException } from '@nestjs/common';
>>>>>>> Stashed changes
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  keepServerAlive(): string {
    return this.appService.keepAlive();
  }
}
  @Post('uptime/ping')
  async uptimePing(@Body() _body: any): Promise<{ ok: true }> {
    try {
      // Accepts an arbitrary JSON body (e.g., { email, password }) from Uptime Kuma
      // but only performs a lightweight DB read to keep DB awake. Does NOT attempt
      // authentication and therefore does not generate auth-failure logs.      curl -i -X POST https://zapetrol-backend.onrender.com/uptime/ping \
        -H "Content-Type: application/json" \
        -d '{"email":"noexisto@example.com","password":"incorrecta"}'
      await this.usersService.ping();
      return { ok: true };
    } catch (err) {
      throw new ServiceUnavailableException('Database unreachable');
    }
  }
<<<<<<< Updated upstream
=======
}
  @Post('uptime/ping')
  async uptimePing(@Body() _body: any): Promise<{ ok: true }> {
    try {
      // Accepts an arbitrary JSON body (e.g., { email, password }) from Uptime Kuma
      // but only performs a lightweight DB read to keep DB awake. Does NOT attempt
      // authentication and therefore does not generate auth-failure logs.      curl -i -X POST https://zapetrol-backend.onrender.com/uptime/ping \
        -H "Content-Type: application/json" \
        -d '{"email":"noexisto@example.com","password":"incorrecta"}'
      await this.usersService.ping();
      return { ok: true };
    } catch (err) {
      throw new ServiceUnavailableException('Database unreachable');
    }
  }
>>>>>>> Stashed changes
