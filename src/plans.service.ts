import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PlanDto } from './dto/plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit?: number): Promise<PlanDto[]> {
    // O modelo correto é 'plans', e os campos conforme o schema
    const query = {
      select: {
        id: true,
        name: true,
        description: true,
        duration_days: true,
        price: true,
        created_at: true,
        updated_at: true,
        created_by: true,
        updated_by: true,
        deleted: true,
        sap_id: true,
        external_provider_id: true,
        installment_price: true,
        installments: true,
        recommended: true,
        discount_percentage: true,
        promotional_price: true,
        erp_service_id: true,
      },
      take: limit,
    };
    const plans = await this.prisma.plans.findMany(limit ? query : { select: query.select });
    return plans;
  }
}
