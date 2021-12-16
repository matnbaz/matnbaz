import { InjectQueue } from '@nestjs/bull';
import { Controller, Get, Param } from '@nestjs/common';
import { Queue } from 'bull';
import { GITHUB_QUEUE } from '../queue';

@Controller('github/discover')
export class GithubDiscovererController {
  constructor(@InjectQueue(GITHUB_QUEUE) private readonly queue: Queue) {}

  @Get('/')
  discover() {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.queue.add('discover');
  }

  @Get('/:username')
  addOwner(@Param() { username }) {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.queue.add('add-owner', { username });
  }
}
