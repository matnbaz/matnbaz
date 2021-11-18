import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ExtractorGhService } from './extractor-gh.service';

@Injectable()
export class ExtractorGhScheduler {
  constructor(private readonly extractor: ExtractorGhService) {}

  // @Cron(CronExpression.EVERY_30_SECONDS)
  async extractRepositories() {
    await this.extractor.extractByRepoSearch();
    // await this.extractor.extractByOwner();
  }
}
