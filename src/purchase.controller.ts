import { Controller, Get, Query } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get()
  async getPurchases(
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ): Promise<PurchaseDto[]> {
    const lim = limit ? Number(limit) : 100;
    const off = offset ? Number(offset) : 0;
    return await this.purchaseService.findAll(lim, off);
  }
}
