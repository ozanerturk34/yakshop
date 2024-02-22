import { Injectable } from '@nestjs/common';
import { StockDto } from './stock.dto';
import { StockGeneratorService } from '../stock-generator/stock-generator.service';
import { YakService } from 'src/yak/yak.service';

@Injectable()
export class StockService {
  constructor(
    private stockGeneratorService: StockGeneratorService,
    private yakService: YakService,
  ) {}
  async getStockByDay(day: number): Promise<StockDto> {
    const yaks = await this.yakService.getInitialYaks();
    return this.stockGeneratorService.generateStockFromYaks(yaks, day).stock;
  }
}
