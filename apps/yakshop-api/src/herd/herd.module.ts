import { Module } from '@nestjs/common';
import { HerdController } from './herd.controller';
import { HerdService } from './herd.service';
import { StockModule } from 'src/stock/stock.module';
import { StockGeneratorModule } from 'src/stock-generator/stock-generator.module';
import { YakModule } from 'src/yak/yak.module';

@Module({
  controllers: [HerdController],
  providers: [HerdService],
  imports: [StockModule, StockGeneratorModule, YakModule],
  exports: [HerdService],
})
export class HerdModule {}
