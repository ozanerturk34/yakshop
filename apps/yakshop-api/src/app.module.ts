import { Module } from '@nestjs/common';
import { StockModule } from './stock/stock.module';
import { RouterModule } from '@nestjs/core';
import { HerdModule } from './herd/herd.module';
import { OrderModule } from './order/order.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { YakModule } from './yak/yak.module';
import { StockGeneratorModule } from './stock-generator/stock-generator.module';

@Module({
  imports: [
    StockModule,
    HerdModule,
    OrderModule,
    YakModule,
    StockGeneratorModule,
    RouterModule.register([
      {
        path: 'yak-shop',
        children: [
          {
            path: 'stock',
            module: StockModule,
          },
          {
            path: 'herd',
            module: HerdModule,
          },
          {
            path: 'order',
            module: OrderModule,
          },
        ],
      },
    ]),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'yakshop123',
      database: 'yak-shop',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
