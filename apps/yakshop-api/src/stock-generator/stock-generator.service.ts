import { Injectable } from '@nestjs/common';
import { Yak } from 'shared-types';
import { StockDto } from '../stock/stock.dto';

@Injectable()
export class StockGeneratorService {
  generateStockFromYaks(
    yaks: Yak[],
    day: number,
  ): { yaks: Yak[]; stock: StockDto } {
    const stock: StockDto = { milk: 0, skins: 0 };
    yaks = yaks.map((yak) => {
      const ageLastShaved =
        yak.age >= 1 ? Number(yak.age.toFixed(2)) : undefined;
      if (ageLastShaved) {
        stock.skins += 1;
      }
      return {
        ...yak,
        ageLastShaved,
      };
    });
    for (let i = 0; i < day; i++) {
      let yakIndex = 0;

      if (yaks.every((yak) => yak.age >= 10)) {
        break;
      }

      for (const yak of yaks) {
        if (yak.age >= 10.00000000000001) {
          continue;
        }

        const isSkinShavableToday = this.isSkinShavable(
          yak.age,
          i,
          yak.ageLastShaved,
        );

        const generatedSkinAmount = isSkinShavableToday ? 1 : 0;
        const generatedMilkAmount = this.generateMilk(yak.age);

        stock.milk += generatedMilkAmount;
        stock.skins += generatedSkinAmount;

        yaks[yakIndex] = {
          ...yak,
          age: Number((yak.age + 0.01).toFixed(2)),
          ageLastShaved: isSkinShavableToday ? i : yak.ageLastShaved,
        };
        yakIndex++;
      }
    }
    this.logData(yaks, stock);
    return {
      yaks,
      stock: {
        milk: Number(stock.milk.toFixed(3)),
        skins: stock.skins,
      },
    };
  }

  private generateMilk(age: number): number {
    return 50 - age * 3;
  }

  private isSkinShavable(
    age: number,
    day: number,
    ageLastShaved?: number,
  ): boolean {
    if (age < 1) return false;
    return (
      !ageLastShaved ||
      (ageLastShaved && 8 + Math.ceil(ageLastShaved + age * 0.01) === day)
    );
  }

  private logData(yaks: Yak[], stock: StockDto): void {
    console.log('------------------');
    console.log('------------------\n');
    console.log('In Stock:\n');
    console.log(` ${stock.milk.toFixed(3)} liters of milk\n`);
    console.log(` ${stock.skins.toFixed(0)} skins of wool\n`);
    console.log('Herd:\n');
    for (const yak of yaks) {
      console.log(` ${yak.name} ${yak.age.toFixed(2)} years old`);
    }
  }
}
