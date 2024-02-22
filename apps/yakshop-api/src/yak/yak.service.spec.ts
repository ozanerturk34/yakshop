import { Test, TestingModule } from '@nestjs/testing';
import { YakService } from './yak.service';

describe('YakService', () => {
  let service: YakService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [YakService],
    }).compile();

    service = module.get<YakService>(YakService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
