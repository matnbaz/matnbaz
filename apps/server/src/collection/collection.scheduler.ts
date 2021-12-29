import { InjectQueue } from '@nestjs/bull';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Queue } from 'bull';
import { MAIN_QUEUE } from '../queue';

@Injectable()
export class CollectionScheduler {
  constructor(@InjectQueue(MAIN_QUEUE) private readonly queue: Queue) {}
  private logger = new Logger(CollectionScheduler.name);

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async collect() {
    this.queue.add('collect');
    this.logger.log(
      `The cronjob for collections got called, the job is now in the queue.`
    );
  }

  async flushQueue() {
    this.queue.removeJobs('*');
  }
}
