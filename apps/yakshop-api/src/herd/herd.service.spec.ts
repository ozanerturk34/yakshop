import { Test, TestingModule } from '@nestjs/testing';
import { HerdService } from './herd.service';
import { StockGeneratorService } from '../stock-generator/stock-generator.service';
import { YakService } from '../yak/yak.service';
import { YakDto } from '../yak/yak.dto';
import { HerdDto } from './herd.dto';
import { Yak, YakSex } from 'shared-types';

describe('HerdService', () => {
  let service: HerdService;
  let stockGeneratorService: StockGeneratorService;
  let yakService: YakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HerdService,
        {
          provide: StockGeneratorService,
          useValue: {
            generateStock: jest.fn(),
          },
        },
        {
          provide: YakService,
          useValue: {
            getAllYaks: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HerdService>(HerdService);
    stockGeneratorService = module.get<StockGeneratorService>(
      StockGeneratorService,
    );
    yakService = module.get<YakService>(YakService);
  });

  describe('getHerdByDay', () => {
    it('should return the herd for the given day', async () => {
      const day = 5;
      const herd: Yak[] = [
        { name: 'Yak 1', age: 4, sex: YakSex['f'], ageLastShaved: 3 },
        { name: 'Yak 2', age: 5, sex: YakSex['f'], ageLastShaved: 2 },
      ];
      jest.spyOn(yakService, 'getInitialYaks').mockResolvedValue(herd);

      const result: HerdDto = await service.getHerdByDay(day);

      expect(result).toEqual({
        day,
        herd: [
          { id: 1, name: 'Yak 1', age: 4, sex: YakSex['f'], ageLastShaved: 3 },
          { id: 2, name: 'Yak 2', age: 5, sex: YakSex['f'], ageLastShaved: 2 },
        ],
      });
      expect(yakService.getInitialYaks).toHaveBeenCalledTimes(1);
    });
  });

  describe('initiateHerdFromXml', () => {
    it('should return the list of yaks after initiating the herd from XML', async () => {
      const result: YakDto[] = await service.initiateHerdFromXml();

      expect(result).toEqual([
        { id: 1, name: 'Yak 1', age: 4, sex: YakSex['f'], ageLastShaved: 3 },
        { id: 2, name: 'Yak 2', age: 5, sex: YakSex['f'], ageLastShaved: 2 },
      ]);
      expect(stockGeneratorService.generateStockFromYaks).toHaveBeenCalledTimes(
        1,
      );
    });
  });

  describe('mapHerdDataToDto', () => {
    it('should map the herd data to DTO format', () => {
      const herd: Yak[] = [
        { name: 'Yak 1', age: 4, sex: YakSex['f'], ageLastShaved: 3 },
        { name: 'Yak 2', age: 5, sex: YakSex['f'], ageLastShaved: 2 },
      ];

      const result: YakDto[] = service['mapHerdDataToDto'](herd);

      expect(result).toEqual([
        { id: 1, name: 'Yak 1', age: 4, sex: YakSex['f'], ageLastShaved: 3 },
        { id: 2, name: 'Yak 2', age: 5, sex: YakSex['f'], ageLastShaved: 2 },
      ]);
    });
  });
});
