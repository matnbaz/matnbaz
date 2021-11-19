import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { GITHUB_QUEUE } from './constants';

@Injectable()
export class OperatorGhScheduler {
  constructor(@InjectQueue(GITHUB_QUEUE) private readonly queue: Queue) {}
  logger = new Logger('OperatorScheduler-GitHub');

  @Cron(CronExpression.EVERY_WEEKEND)
  async discover() {
    this.logger.log('Cronjob for discovery got called');

    this.queue.add('discover', { term: 'iranian' });
    this.queue.add('discover', { term: 'persian' });
    // await this.extractor.discoverOwners('iranian');
    // await this.extractor.discoverOwners('persian');
  }

  // @Cron(CronExpression.EVERY_4_HOURS)
  async extractAndUpdate() {
    this.logger.log('Cronjob for discovery got called');

    this.queue.add('extract');
    // await this.extractor.extractReposFromOwners();
  }

  async flushQueue() {
    this.queue.removeJobs('*');
  }
}
