import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { YakRepository } from './yak.repository';
import type { Yak as SharedYak } from 'shared-types';
import { CreateYaksDto } from './create-yak.dto';
import { Yak } from './yak.entity';

@Injectable()
export class YakService {
  constructor(
    @InjectRepository(YakRepository) private yakRepository: YakRepository,
  ) {}

  async getInitialYaks(): Promise<SharedYak[]> {
    const yaks = await this.yakRepository.getYaks();
    const flattenYaks = this.flattenHerdData(yaks);
    return flattenYaks;
  }

  async createInitialYaks(createYaksDto: CreateYaksDto): Promise<Yak[]> {
    return this.yakRepository.createYaks(createYaksDto);
  }

  private flattenHerdData(herd: Yak[]): SharedYak[] {
    return herd.map((yak) => ({
      ...yak,
      ageLastShaved: 0,
    }));
  }
}
