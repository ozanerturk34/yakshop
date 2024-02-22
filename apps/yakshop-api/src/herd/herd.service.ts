import { Injectable } from '@nestjs/common';
import { HerdDto } from './herd.dto';
import { StockGeneratorService } from 'src/stock-generator/stock-generator.service';
import type { Yak } from 'shared-types';
import { YakDto } from '../yak/yak.dto';
import { YakService } from 'src/yak/yak.service';
import { HerdBuilder } from 'xml-herd-builder';

@Injectable()
export class HerdService {
  constructor(
    private stockGeneratorService: StockGeneratorService,
    private yakService: YakService,
  ) {}

  async getHerdByDay(day: number): Promise<HerdDto> {
    const yaks = await this.yakService.getInitialYaks();
    const herd = await this.stockGeneratorService.generateStockFromYaks(
      yaks,
      day,
    ).yaks;
    return {
      herd: this.mapHerdDataToDto(herd),
    };
  }

  async initiateHerdFromXml(): Promise<YakDto[]> {
    const herd = new HerdBuilder('./data/herd.xml');
    const yaks = await this.yakService.createInitialYaks({
      yaks: herd.yaks.map((yak) => ({
        age: yak.age,
        name: yak.name,
        sex: yak.sex,
      })),
    });
    return this.mapHerdDataToDto(yaks);
  }

  private mapHerdDataToDto(herd: Yak[]): YakDto[] {
    return herd.map(({ age, name, ageLastShaved }) => ({
      name,
      age,
      'age-last-shaved': ageLastShaved ?? 0,
    }));
  }
}
