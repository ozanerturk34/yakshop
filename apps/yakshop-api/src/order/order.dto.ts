import { IsNumber, IsOptional } from 'class-validator';

export class OrderDto {
  @IsOptional()
  @IsNumber()
  milk?: number;

  @IsOptional()
  @IsNumber()
  skins?: number;
}
