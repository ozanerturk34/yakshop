import { Module } from '@nestjs/common';
import { YakService } from './yak.service';
import { YakRepository } from './yak.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Yak } from './yak.entity';

@Module({
  providers: [YakService, YakRepository],
  imports: [TypeOrmModule.forFeature([Yak])],
  exports: [YakService],
})
export class YakModule {}
