import { Controller, Get } from '@nestjs/common';
import { OperatorGhScheduler } from './operator-gh.scheduler';

@Controller('operator/gh')
export class OperatorGhController {
  constructor(private readonly scheduler: OperatorGhScheduler) {}

  @Get('discover')
  async discover() {
    if (process.env.NODE_ENV === 'development') {
      await this.scheduler.discover();
    }
  }

  @Get('extract')
  async extract() {
    if (process.env.NODE_ENV === 'development') {
      await this.scheduler.extractAndUpdate();
    }
  }

  @Get('flush')
  async flush() {
    if (process.env.NODE_ENV === 'development') {
      this.scheduler.flushQueue();
    }
  }
}
