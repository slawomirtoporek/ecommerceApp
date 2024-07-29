import { Injectable } from '@nestjs/common';
import { Order } from '@prisma/client';
import { PrismaService } from 'src/shared/services/prisma.service';
import { CreateOrderDTO } from '../orders/dtos/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public async create(
    orderData: CreateOrderDTO,
    albumId: string,
  ): Promise<Order> {
    try {
      const order = await this.prismaService.order.create({
        data: {
          ...orderData,
          orderItems: {
            create: orderData.orderItems.map((item) => ({
              albumId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });
      return order;
    } catch (error) {
      throw error;
    }
  }
}
