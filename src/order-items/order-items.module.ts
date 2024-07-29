import { Module, forwardRef } from '@nestjs/common';
import { OrderItemsController } from './order-items.controller';
import { OrderItemsService } from './order-items.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { OrdersModule } from 'src/orders/orders.module';

@Module({
  imports: [forwardRef(() => OrdersModule)],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, PrismaService],
})
export class OrderItemsModule {}
