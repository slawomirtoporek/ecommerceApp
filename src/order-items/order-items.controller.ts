import { Controller, ParseUUIDPipe, Post, Body, Param } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDTO } from '../order-items/dtos/create-order-items.dto';

@Controller('orders/:orderId/order-items')
export class OrderItemsController {
  constructor(private orderItemsService: OrderItemsService) {}

  @Post()
  create(
    @Param('orderId', ParseUUIDPipe) orderId: string,
    @Param('albumId', ParseUUIDPipe) albumId: string,
    @Body() orderItemData: CreateOrderItemDTO,
  ) {
    return this.orderItemsService.create(orderId, albumId, orderItemData);
  }
}
