import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  healthCheck(): { status: string; date: string } {
    return {
      status: 'ok',
      date: new Date().toISOString(),
    };
  }
}
