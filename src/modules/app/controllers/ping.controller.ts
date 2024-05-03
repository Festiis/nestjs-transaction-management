import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse } from '@nestjs/swagger';
import { PingService } from '../services/ping.service';

@Controller('ping')
@ApiTags('Ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  @ApiOperation({ summary: 'Healthcheck to make sure the service is up.' })
  @ApiResponse({ status: 200, description: 'The service is up and running.' })
  ping(): string {
    return this.pingService.ping();
  }
}
