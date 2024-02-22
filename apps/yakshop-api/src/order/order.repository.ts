import { DataSource, Repository } from 'typeorm';
import { Order } from './order.entity';
import { Injectable } from '@nestjs/common';
import { OrderWithCustomerInfoDto } from './order-with-customer-info.dto';
import { OrderDto } from './order.dto';

@Injectable()
export class OrderRepository extends Repository<Order> {
  constructor(private dataSource: DataSource) {
    super(Order, dataSource.createEntityManager());
  }

  async getTotalOrderedAmount(): Promise<OrderDto> {
    const [milk, skins] = await Promise.all([
      this.sum('milk'),
      this.sum('skins'),
    ]);
    return { milk, skins };
  }

  async saveOrder({
    customer,
    order,
  }: OrderWithCustomerInfoDto): Promise<void> {
    const newOrder = this.create({
      customer,
      milk: order.milk,
      skins: order.skins,
    });
    await this.save(newOrder);
  }
}
