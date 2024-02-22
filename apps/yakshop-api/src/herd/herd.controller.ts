import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { HerdService } from './herd.service';
import { HerdDto } from './herd.dto';
import { YakDto } from '../yak/yak.dto';

@Controller()
export class HerdController {
  constructor(private herdService: HerdService) {}

  @Get(':day')
  getHerdByDay(@Param('day', ParseIntPipe) day: number): Promise<HerdDto> {
    return this.herdService.getHerdByDay(day);
  }

  @Post('initiate')
  initiateHerdFromXml(): Promise<YakDto[]> {
    return this.herdService.initiateHerdFromXml();
  }
}
