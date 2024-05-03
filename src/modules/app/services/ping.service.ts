import { Injectable } from '@nestjs/common';

@Injectable()
export class PingService {
  public ping(): string {
    return 'The service is up and running.';
  }
}
