import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockDto } from './stock.dto';

@Controller()
export class StockController {
  constructor(private stockService: StockService) {}

  @Get(':day')
  getStockByDay(@Param('day', ParseIntPipe) day: number): Promise<StockDto> {
    return this.stockService.getStockByDay(day);
  }
}
