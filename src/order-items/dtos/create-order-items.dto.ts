import { IsNotEmpty, IsNumber, Min, IsString } from 'class-validator';

export class CreateOrderItemDTO {
  @IsNotEmpty()
  @IsString()
  albumId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;
}
