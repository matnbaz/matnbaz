import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { OperatorGhService } from './operator-gh.service';

@Injectable()
export class OperatorGhScheduler {
  constructor(private readonly extractor: OperatorGhService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async discover() {
    Logger.log('👀 Starting discovery for maintainers');

    await this.extractor.discoverOwners('iranian');
    await this.extractor.discoverOwners('persian');
  }

  @Cron(CronExpression.EVERY_4_HOURS)
  async extractAndUpdate() {
    Logger.log('⛏ Starting extraction of repositories');

    await this.extractor.extractReposFromOwners();
  }
}
