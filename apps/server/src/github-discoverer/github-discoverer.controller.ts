import { Controller, Get } from '@nestjs/common';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';

@Controller('github/discover')
export class GithubDiscovererController {
  constructor(private readonly scheduler: GithubDiscovererScheduler) {}

  @Get('/')
  discover() {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.scheduler.discover();
  }
}
