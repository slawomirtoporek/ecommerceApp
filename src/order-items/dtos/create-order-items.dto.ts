import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateOrderItemDTO {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
