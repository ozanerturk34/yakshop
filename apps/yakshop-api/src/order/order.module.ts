import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { StockModule } from 'src/stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderRepository } from './order.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  imports: [StockModule, TypeOrmModule.forFeature([Order])],
})
export class OrderModule {}
