import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { GITHUB_QUEUE } from '../queue';
import { GithubService } from './github.service';

@Processor(GITHUB_QUEUE)
export class GithubProcessor {
  constructor(private readonly githubService: GithubService) {}
  logger = new Logger(GithubProcessor.name);

  @Process('add-owner')
  async addOwnerProcess(job: Job) {
    if (!job.data.username) {
      this.logger.error(
        'No username provided for the `add-owner` job; returning.'
      );
      return;
    }

    this.githubService.addOwner(job.data.username);
  }
}
