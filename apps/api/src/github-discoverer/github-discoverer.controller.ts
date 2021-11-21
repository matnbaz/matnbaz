import { Controller, Get } from '@nestjs/common';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';

@Controller('github')
export class GithubDiscovererController {
  constructor(private readonly scheduler: GithubDiscovererScheduler) {}

  @Get('discover')
  async discover() {
    if (process.env.NODE_ENV === 'development') {
      await this.scheduler.discover();
    }
  }

  @Get('flush')
  async flush() {
    if (process.env.NODE_ENV === 'development') {
      this.scheduler.flushQueue();
    }
  }
}
