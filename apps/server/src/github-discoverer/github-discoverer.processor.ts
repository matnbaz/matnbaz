import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GITHUB_QUEUE } from '../queue';
import { GithubDiscovererService } from './github-discoverer.service';

@Processor(GITHUB_QUEUE)
export class GithubDiscovererProcessor {
  constructor(private readonly discoverer: GithubDiscovererService) {}
  private logger = new Logger(GithubDiscovererProcessor.name);

  @Process('discover')
  async discoverProcess() {
    this.logger.log('Starting the extraction of repositories...');
    this.discoverer.discoverByPredefinedTerms();
  }

  // TODO: this should perhaps be in a different service
  @Process('add-owner')
  async addOwnerProcess(job: Job) {
    if (!job.data.username) {
      this.logger.error(
        'No username provided for the `add-owner` job; returning.'
      );
      return;
    }

    this.discoverer.addOwner(job.data.username);
  }
}
