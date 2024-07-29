import { Injectable } from '@nestjs/common';
import { OrderItem } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class OrderItemsService {
  constructor(private prismaService: PrismaService) {}

  public create(
    orderId: string,
    albumId: string,
    orderItemData: Omit<OrderItem, 'id' | 'orderId' | 'albumId'>,
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
