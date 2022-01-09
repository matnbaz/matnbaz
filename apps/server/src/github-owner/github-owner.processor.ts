import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';
import { GithubOwnerService } from './github-owner.service';

@Processor(GITHUB_QUEUE)
export class GithubOwnerProcessor {
  constructor(private readonly ownerService: GithubOwnerService) {}
  private logger = new Logger(GithubOwnerProcessor.name);

  @Process(GITHUB_PROCESSES.DISCOVER_OWNERS_REPO_TERMS)
  async discoverProcess() {
    this.logger.log(
      'Starting the discovery of owners with predefined terms...'
    );

    await this.ownerService.discoverByPredefinedTerms();
  }

  @Process(GITHUB_PROCESSES.EXTRACT_OWNERS)
  async extractOwnersProcess() {
    this.logger.log('Starting the extraction of owners (statistics)...');

    await this.ownerService.updateAllOwnersStatistics();
  }
}
