
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ConversionMetricsController } from './conversion-metrics.controller';
import { ConversionMetricsService } from './conversion-metrics.service';
import { CustomerAnalyticsController } from './customer-analytics.controller';
import { CustomerAnalyticsService } from './customer-analytics.service';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [PrismaModule],
  controllers: [AppController, PlansController, PurchaseController, UsersController, ConversionMetricsController, CustomerAnalyticsController],
  providers: [AppService, PlansService, PurchaseService, UsersService, ConversionMetricsService, CustomerAnalyticsService],
})
export class AppModule {}
