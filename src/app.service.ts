import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  keepAlive(): string {
    return 'Server is awake!';
  }
}
