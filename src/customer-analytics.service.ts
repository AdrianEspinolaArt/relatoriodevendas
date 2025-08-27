import { Injectable } from '@nestjs/common';
import { MongooseService } from './mongoose/mongoose.service';
import { PrismaService } from './prisma/prisma.service';
import { CustomerAnalyticsDto } from './dto/customer-analytics.dto';
import { PAYMENT_METHOD_ENUM } from '@prisma/client';


@Injectable()
export class CustomerAnalyticsService {
  constructor(
    private readonly mongooseService: MongooseService,
    private readonly prisma: PrismaService,
  ) {}

  async getAnalytics(): Promise<CustomerAnalyticsDto> {
    const db = this.mongooseService.getConnection().db;
    if (!db) throw new Error('Database connection is not available.');
    const usersCol = db.collection('users');
    const totalUsers = await usersCol.countDocuments({});

    // Todas as vendas (não trial)
    const allSales = await this.prisma.purchases.findMany({
      where: {
        package_id: { not: 'trial' },
        payment_method: {}, // Use the correct enum value from the enum
      },
      select: {
        id: true,
        user_id: true,
        paid_price: true,
        status: true,
        package_id: true,
        payment_method: true,
      },
    });

    // Vendas pagas
    const paidSales = await this.prisma.purchases.findMany({
      where: {
        status: 'PAID',
        package_id: { not: 'trial' },
        payment_method: { not: PAYMENT_METHOD_ENUM.GIFT },
      },
      select: {
        id: true,
        user_id: true,
        paid_price: true,
        status: true,
      },
    });

    // Clientes únicos
    const uniqueCustomersWithSales = new Set(allSales.map(s => s.user_id).filter(Boolean)).size;
    const uniqueCustomersWithPaidSales = new Set(paidSales.map(s => s.user_id).filter(Boolean)).size;

    // Clientes recorrentes (mais de 1 compra)
    const purchaseCounts: Record<string, number> = {};
    for (const s of allSales) {
      if (!s.user_id) continue;
      purchaseCounts[s.user_id] = (purchaseCounts[s.user_id] || 0) + 1;
    }
    const returningCustomers = Object.values(purchaseCounts).filter(c => c > 1).length;

    // Receita, ticket médio, LTV
    const totalRevenue = paidSales.reduce((sum, s) => sum + Number(s.paid_price || 0), 0);
    const totalPaidSales = paidSales.length;
    const avgOrderValue = totalPaidSales > 0 ? totalRevenue / totalPaidSales : 0;
    const customerLTV = uniqueCustomersWithPaidSales > 0 ? totalRevenue / uniqueCustomersWithPaidSales : 0;

    // Taxa de conversão
    const conversionRate = totalUsers > 0 ? (uniqueCustomersWithPaidSales / totalUsers) * 100 : 0;

    return {
      totalUsers: totalUsers || 0,
      activeCustomers: uniqueCustomersWithSales,
      returningCustomers,
      avgOrderValue,
      customerLTV,
      conversionRate,
    };
  }
}
