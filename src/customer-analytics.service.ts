import { Injectable } from '@nestjs/common';
import { MongooseService } from './mongoose/mongoose.service';
import { PrismaService } from './prisma/prisma.service';
import { CustomerAnalyticsDto } from './dto/customer-analytics.dto';

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

    // All sales (non-trial)
    const allSales = await this.prisma.purchases.findMany({
      where: {
        package_id: { not: { contains: 'trial', mode: 'insensitive' } },
        payment_method: { not: { contains: 'trial', mode: 'insensitive' } },
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

    // Paid sales
    const paidSales = await this.prisma.purchases.findMany({
      where: {
        status: 'PAID',
        package_id: { not: { contains: 'trial', mode: 'insensitive' } },
        payment_method: { not: { contains: 'trial', mode: 'insensitive' } },
      },
      select: {
        id: true,
        user_id: true,
        paid_price: true,
        status: true,
      },
    });

    // Unique customers with sales / paid sales
    const uniqueCustomersWithSales = new Set(allSales.map(s => s.user_id).filter(Boolean)).size;
    const uniqueCustomersWithPaidSales = new Set(paidSales.map(s => s.user_id).filter(Boolean)).size;

    // Returning customers (more than 1 purchase)
    const purchaseCounts: Record<string, number> = {};
    for (const s of allSales) {
      if (!s.user_id) continue;
      purchaseCounts[s.user_id] = (purchaseCounts[s.user_id] || 0) + 1;
    }
    const returningCustomers = Object.values(purchaseCounts).filter(c => c > 1).length;

    // Revenue, AOV, LTV
    const totalRevenue = paidSales.reduce((sum, s) => sum + Number(s.paid_price || 0), 0);
    const totalPaidSales = paidSales.length;
    const avgOrderValue = totalPaidSales > 0 ? totalRevenue / totalPaidSales : 0;
    const customerLTV = uniqueCustomersWithPaidSales > 0 ? totalRevenue / uniqueCustomersWithPaidSales : 0;

    // Conversion rate = paying unique customers / total registered users
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
