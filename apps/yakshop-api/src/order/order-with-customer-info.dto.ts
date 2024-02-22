import { OrderDto } from './order.dto';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class OrderWithCustomerInfoDto {
  @IsNotEmpty()
  customer: string;

  @IsNotEmptyObject()
  order: OrderDto;
}
