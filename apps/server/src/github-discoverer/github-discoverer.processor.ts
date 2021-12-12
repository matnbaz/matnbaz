import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_DISCOVERER_QUEUE } from './constants';
import { GithubDiscovererService } from './github-discoverer.service';

@Processor(GITHUB_DISCOVERER_QUEUE)
export class GithubDiscovererProcessor {
  constructor(private readonly discoverer: GithubDiscovererService) {}
  private logger = new Logger(GithubDiscovererProcessor.name);

  @Process('discover')
  async discoverProcess() {
    this.logger.log('Starting the extraction of repositories...');
    this.discoverer.discoverByPredefinedTerms();
  }
}
