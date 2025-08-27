import { Controller, Get } from '@nestjs/common';
import { ConversionMetricsService } from './conversion-metrics.service';
import { ConversionMetricsDto } from './dto/conversion-metrics.dto';

@Controller('conversion-metrics')
export class ConversionMetricsController {
  constructor(private readonly service: ConversionMetricsService) {}

  @Get()
  async getMetrics(): Promise<ConversionMetricsDto> {
    return await this.service.getMetrics();
  }
}
