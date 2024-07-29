import { Controller } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';

@Controller('orders/:orderId/order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}
}
