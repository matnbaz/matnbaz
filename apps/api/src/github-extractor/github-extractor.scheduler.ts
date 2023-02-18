import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';

@Injectable()
export class GithubExtractorScheduler {
  constructor(@InjectQueue(GITHUB_QUEUE) private readonly queue: Queue) {}
  private logger = new Logger(GithubExtractorScheduler.name);

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async extract() {
    await this.queue.add(GITHUB_PROCESSES.EXTRACT);
    this.logger.log(
      `The cronjob for GitHub owner extraction got called, the job is now in the queue.`
    );
  }
}
