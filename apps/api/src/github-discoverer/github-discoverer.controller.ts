import { Controller } from '@nestjs/common';
import { GithubDiscovererScheduler } from './github-discoverer.scheduler';

@Controller('github')
export class GithubDiscovererController {
  constructor(private readonly scheduler: GithubDiscovererScheduler) {}
}
