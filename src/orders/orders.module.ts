import { Module, forwardRef } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { OrderItemsModule } from 'src/order-items/order-items.module';

@Module({
  imports: [forwardRef(() => OrderItemsModule)],
  controllers: [OrdersController],
  providers: [OrdersService, PrismaService],
})
export class OrdersModule {}
