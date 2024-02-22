import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Yak } from './yak.entity';
import { CreateYakDto, CreateYaksDto } from './create-yak.dto';

@Injectable()
export class YakRepository extends Repository<Yak> {
  constructor(private dataSource: DataSource) {
    super(Yak, dataSource.createEntityManager());
  }

  private async createYak(yak: CreateYakDto): Promise<Yak> {
    const newYak = this.create(yak);
    this.save(newYak);
    return newYak;
  }

  async createYaks({ yaks }: CreateYaksDto): Promise<Yak[]> {
    const newYaks = await Promise.all(yaks.map((yak) => this.createYak(yak)));
    return newYaks;
  }

  async getYaks(): Promise<Yak[]> {
    const query = this.createQueryBuilder('get-yaks');
    return query.getMany();
  }
}
