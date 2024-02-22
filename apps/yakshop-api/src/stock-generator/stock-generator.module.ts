import { Module } from '@nestjs/common';
import { StockGeneratorService } from './stock-generator.service';

@Module({
  providers: [StockGeneratorService],
  exports: [StockGeneratorService],
})
export class StockGeneratorModule {}
