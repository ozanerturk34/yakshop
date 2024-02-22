import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockGeneratorModule } from 'src/stock-generator/stock-generator.module';
import { YakModule } from 'src/yak/yak.module';

@Module({
  controllers: [StockController],
  providers: [StockService],
  imports: [StockGeneratorModule, YakModule],
  exports: [StockService],
})
export class StockModule {}
