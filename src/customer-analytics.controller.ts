import { Controller, Get } from '@nestjs/common';
import { CustomerAnalyticsService } from './customer-analytics.service';
import { CustomerAnalyticsDto } from './dto/customer-analytics.dto';

@Controller('customer-analytics')
export class CustomerAnalyticsController {
  constructor(private readonly service: CustomerAnalyticsService) {}

  @Get()
  async getAnalytics(): Promise<CustomerAnalyticsDto> {
    return await this.service.getAnalytics();
  }
}
