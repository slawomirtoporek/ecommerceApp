import { $Enums } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEmail,
  IsEnum,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDTO } from 'src/order-items/dtos/create-order-items.dto';

export class CreateOrderDTO {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber: string;

  @IsString()
  comment?: string;

  @IsNotEmpty()
  @IsEnum($Enums.DeliveryMethod)
  delivery: $Enums.DeliveryMethod;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  priceProducts: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  totalAmount: number;

  @IsNotEmpty()
  @IsString()
  status: string;

  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDTO)
  orderItems: CreateOrderItemDTO[];
}
