import { Controller, ParseUUIDPipe, Post, Param, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDTO } from './dtos/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/:albumId')
  create(
    @Param('albumId', new ParseUUIDPipe()) albumId: string,
    @Body() orderData: CreateOrderDTO,
  ) {
    return this.ordersService.create(orderData, albumId);
  }
}
