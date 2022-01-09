import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';

@Injectable()
export class GithubLocationScheduler {
  constructor(@InjectQueue(GITHUB_QUEUE) private readonly queue: Queue) {}
  private logger = new Logger(GithubLocationScheduler.name);

  @Cron(CronExpression.EVERY_DAY_AT_1AM)
  async discoverByLocation() {
    await this.queue.add(GITHUB_PROCESSES.DISCOVER_OWNERS_BY_LOCATION);
    this.logger.log(
      `The cronjob for GitHub's user location-based user discovery got called, the job is now in the queue.`
    );
  }
}
