import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_QUEUE } from '../queue';
import { GithubOwnerService } from './github-owner.service';

@Processor(GITHUB_QUEUE)
export class GithubOwnerProcessor {
  constructor(private readonly ownerService: GithubOwnerService) {}
  private logger = new Logger(GithubOwnerProcessor.name);

  @Process('discover')
  async discoverProcess() {
    this.logger.log('Starting the extraction of repositories...');

    await this.ownerService.discoverByPredefinedTerms();
  }
}
