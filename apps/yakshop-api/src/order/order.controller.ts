import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Response } from 'express';
import { OrderWithCustomerInfoDto } from './order-with-customer-info.dto';
import { OrderDto } from './order.dto';

@Controller()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post('cumulative/:day')
  orderForDayCumulative(
    @Res({ passthrough: true }) res: Response,
    @Param('day', ParseIntPipe) day: number,
    @Body() orderWithCustomerInfoDto: OrderWithCustomerInfoDto,
  ): Promise<OrderDto> {
    return this.orderService.orderForDayCumulative(
      day,
      orderWithCustomerInfoDto,
      res,
    );
  }

  @Post(':day')
  orderForDay(
    @Res({ passthrough: true }) res: Response,
    @Param('day', ParseIntPipe) day: number,
    @Body() orderWithCustomerInfoDto: OrderWithCustomerInfoDto,
  ): Promise<OrderDto> {
    return this.orderService.orderForDay(day, orderWithCustomerInfoDto, res);
  }

  @Get('available/:day')
  getAvailableOrderInfo(
    @Param('day', ParseIntPipe) day: number,
  ): Promise<OrderDto> {
    return this.orderService.getAvailableOrderInfo(day);
  }
}
