import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateOrderItemDTO } from '../order-items/dtos/create-order-items.dto';

@Injectable()
export class OrderItemsService {
  constructor(private prismaService: PrismaService) {}

  public create(
    orderId: string,
    albumId: string,
    orderItemData: CreateOrderItemDTO,
  ): Promise<OrderItem> {
    return this.prismaService.orderItem.create({
      data: {
        ...orderItemData,
        orderId,
        albumId,
      },
    });
  }
}
