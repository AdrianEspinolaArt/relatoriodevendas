import { Injectable } from '@nestjs/common';
import { MongooseService } from './mongoose/mongoose.service';
import { PrismaService } from './prisma/prisma.service';
import { ConversionMetricsDto } from './dto/conversion-metrics.dto';

function parseClientData(raw: any) {
  try {
    if (!raw) return {};
    if (typeof raw === 'object') return raw;
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function extractName(client: any) {
  return client?.name || client?.nome || client?.fullName || client?.full_name || null;
}

function extractCPF(client: any) {
  return client?.cpf || client?.cpfCnpj || client?.cpf_cnpj || client?.document || null;
}

@Injectable()
export class ConversionMetricsService {
  constructor(
    private readonly mongooseService: MongooseService,
    private readonly prisma: PrismaService,
  ) {}

  async getMetrics(): Promise<ConversionMetricsDto> {
    const db = this.mongooseService.getConnection().db;
    if (!db) throw new Error('Database connection is not available.');
    const usersCol = db.collection('users');
    const totalUsers = await usersCol.countDocuments({});

    // Orders (Postgres)
    const orders = await this.prisma.purchases.findMany({
      where: {
        package_id: { not: { contains: 'trial', mode: 'insensitive' } },
        payment_method: { not: { contains: 'trial', mode: 'insensitive' } },
      },
      select: {
        id: true,
        id_pedido_erp: true,
        client_data: true,
        paid_price: true,
        package_id: true,
        payment_method: true,
        status: true,
      },
    });

    // Payments (status PAID)
    const payments = await this.prisma.purchases.findMany({
      where: {
        status: 'PAID',
        package_id: { not: { contains: 'trial', mode: 'insensitive' } },
        payment_method: { not: { contains: 'trial', mode: 'insensitive' } },
      },
      select: {
        id: true,
        paid_price: true,
        client_data: true,
      },
    });

    const totalOrders = orders.length;
    const totalPayments = payments.length;
    const totalOrderedValue = orders.reduce((sum, o) => sum + Number(o.paid_price || 0), 0);
    const totalPaidValue = payments.reduce((sum, p) => sum + Number(p.paid_price || 0), 0);

    // unique customers by name+cpf
    const customersSet = new Set<string>();
    for (const o of orders) {
      const client = parseClientData(o.client_data);
      const name = extractName(client) || 'unknown';
      const cpf = extractCPF(client) || 'unknown';
      customersSet.add(`${name}-${cpf}`);
    }
    const uniqueCustomers = customersSet.size;
    const userConversionRate = totalUsers > 0 ? (uniqueCustomers / totalUsers) * 100 : 0;

    return {
      users: {
        total: totalUsers || 0,
        uniqueCustomers,
        conversionRate: Number(userConversionRate.toFixed(1)),
      },
      orders: {
        total: totalOrders,
        payments: totalPayments,
        value: {
          ordered: totalOrderedValue,
          paid: totalPaidValue,
        },
      },
    };
  }
}
