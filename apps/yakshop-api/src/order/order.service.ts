import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { OrderDto } from './order.dto';
import { Response } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { StockService } from 'src/stock/stock.service';
import { OrderWithCustomerInfoDto } from './order-with-customer-info.dto';
import { OrderRepository } from './order.repository';
import { StockDto } from 'src/stock/stock.dto';

@Injectable()
export class OrderService {
  constructor(
    private stockService: StockService,
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
  ) {}
  async orderForDay(
    day: number,
    orderWithCustomerInfoDto: OrderWithCustomerInfoDto,
    res: Response,
  ): Promise<OrderDto> {
    const stock = await this.stockService.getStockByDay(day);
    return this.checkStock(stock, orderWithCustomerInfoDto, res);
  }

  async orderForDayCumulative(
    day: number,
    orderWithCustomerInfoDto: OrderWithCustomerInfoDto,
    res: Response,
  ): Promise<OrderDto> {
    const stock = await this.getRemainingStock(day);
    await this.saveOrder(stock, orderWithCustomerInfoDto);
    return this.checkStock(stock, orderWithCustomerInfoDto, res);
  }

  checkStock(
    stock: StockDto,
    { order }: OrderWithCustomerInfoDto,
    res: Response,
  ): OrderDto {
    if (stock.milk >= order.milk && stock.skins >= order.skins) {
      return order;
    }
    if (stock.milk >= order.milk) {
      res.status(HttpStatus.PARTIAL_CONTENT);
      return { milk: order.milk };
    }
    if (stock.skins >= order.skins) {
      res.status(HttpStatus.PARTIAL_CONTENT);
      return { skins: order.skins };
    }
    throw new NotFoundException('Not enough product in the stocks');
  }

  async saveOrder(
    stock: StockDto,
    { customer, order }: OrderWithCustomerInfoDto,
  ): Promise<void> {
    if (stock.milk >= order.milk && stock.skins >= order.skins) {
      await this.orderRepository.saveOrder({ customer, order });
    }
    if (stock.milk >= order.milk) {
      await this.orderRepository.saveOrder({
        customer,
        order: { milk: order.milk },
      });
    }
    if (stock.skins >= order.skins) {
      await this.orderRepository.saveOrder({
        customer,
        order: { skins: order.skins },
      });
    }
  }

  async getAvailableOrderInfo(day: number): Promise<OrderDto> {
    const stock = await this.getRemainingStock(day);
    return {
      milk: Number(stock.milk.toFixed(2)),
      skins: stock.skins,
    };
  }

  private async getRemainingStock(day: number): Promise<StockDto> {
    const stock = await this.stockService.getStockByDay(day);
    const sold = await this.getTotalOrderedAmount();
    return {
      milk: stock.milk - (sold.milk ?? 0),
      skins: stock.skins - (sold.skins ?? 0),
    };
  }

  private async getTotalOrderedAmount(): Promise<OrderDto> {
    const { milk, skins } = await this.orderRepository.getTotalOrderedAmount();
    return { milk, skins };
  }
}
