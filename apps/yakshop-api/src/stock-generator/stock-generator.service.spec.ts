import { Test, TestingModule } from '@nestjs/testing';
import { StockGeneratorService } from './stock-generator.service';

describe('StockGeneratorService', () => {
  let service: StockGeneratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StockGeneratorService],
    }).compile();

    service = module.get<StockGeneratorService>(StockGeneratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
