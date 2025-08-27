import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PlanDto } from './dto/plan.dto';

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit?: number): Promise<PlanDto[]> {
    const query = {
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        expires_at: true,
        payment_due_date: true,
        billingInfo: true,
        client_data: true,
      },
      take: limit,
    };
    return this.prisma.plans.findMany(limit ? query : { select: query.select });
  }
}
