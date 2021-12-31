import { Controller, Get } from '@nestjs/common';
import { GithubLocationScheduler } from './github-location.scheduler';

@Controller('github/location')
export class GithubLocationController {
  constructor(private readonly scheduler: GithubLocationScheduler) {}

  @Get('/')
  extract() {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.scheduler.discoverByLocation();
  }
}
