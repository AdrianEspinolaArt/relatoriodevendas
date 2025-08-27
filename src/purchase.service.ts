import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PurchaseDto } from './dto/purchase.dto';

function parseClientData(raw: any) {
  try {
    if (!raw) return {};
    if (typeof raw === 'object') return raw;
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

@Injectable()
export class PurchaseService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(limit = 100, offset = 0): Promise<PurchaseDto[]> {
  const purchases = await this.prisma.purchases.findMany({
      orderBy: { created_at: 'desc' },
      take: limit,
      skip: offset,
    });

    // Buscar planos relacionados
  const planIds = Array.from(new Set(purchases.map(p => p.plan_id).filter((id): id is number => typeof id === 'number')));
  let plansMap = {};
  if (planIds.length) {
    const plans = await this.prisma.plans.findMany({ where: { id: { in: planIds } } });
    plansMap = Object.fromEntries(plans.map(pl => [pl.id, pl]));
  }

    // Mapear cada purchase para o JSON de saída
    return purchases.map(p => {
      const client = parseClientData(p.client_data);
      const planoNome = p.plan_id && plansMap[p.plan_id] ? plansMap[p.plan_id].name : null;
      return {
        id: p.id,
        pedidoid: p.id_pedido_erp || p.id,
        nome: client?.name || client?.nome || client?.fullName || null,
        email: client?.email || null,
        cpf: client?.cpfCnpj || null,
        telefone: client?.telefone1 || client?.telefone || null,
        produto: p.package_id || null,
        plan: planoNome,
        valororiginal: p.paid_price ?? null,
        formapagto: p.payment_method || null,
        datacadastro: p.created_at ? new Date(p.created_at).toLocaleDateString('pt-BR') : null,
        statuspedido: p.status || null,
        recorrente: p.type === 'recurring' || false,
      };
    });
  }
}
