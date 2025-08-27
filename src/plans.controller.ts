import { Controller, Get, Query } from '@nestjs/common';
import { PlansService } from './plans.service';
import { PlanDto } from './dto/plan.dto';
import { ApiTags, ApiResponse, ApiQuery } from '@nestjs/swagger';

@ApiTags('Plans')
@Controller('plans')
export class PlansController {
  constructor(private readonly plansService: PlansService) {}

  @Get()
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Limite de resultados' })
  @ApiResponse({ status: 200, description: 'Lista de planos', type: [PlanDto] })
  async getPlans(@Query('limit') limit?: string): Promise<PlanDto[]> {
    const lim = limit ? Number(limit) : undefined;
    return await this.plansService.findAll(lim);
  }
}
