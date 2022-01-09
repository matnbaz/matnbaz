import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';

/**
 * Not used for now.
 * @deprecated
 */
@Injectable()
export class GithubScheduler {
  constructor(@InjectQueue(GITHUB_QUEUE) private readonly queue: Queue) {}
  private logger = new Logger(GithubScheduler.name);

  @Cron(CronExpression.EVERY_DAY_AT_2AM)
  async runScheduler() {
    await this.queue.add(GITHUB_PROCESSES.DISCOVER_OWNERS_REPO_TERMS);
    await this.queue.add(GITHUB_PROCESSES.DISCOVER_OWNERS_BY_LOCATION);
    await this.queue.add(GITHUB_PROCESSES.EXTRACT_OWNERS);
    await this.queue.add(GITHUB_PROCESSES.EXTRACT_REPOS);

    this.logger.log(
      `The cronjob for GitHub got called, the jobs are now in the queue.`
    );
  }
}
