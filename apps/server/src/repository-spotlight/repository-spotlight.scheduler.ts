import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Injectable()
export class RepositorySpotlightScheduler {
  constructor(private readonly spotlightService: RepositorySpotlightService) {}
  private logger = new Logger(RepositorySpotlightScheduler.name);

  @Cron('0 21 * * 4-5') // At 21:00 on every day-of-week from Thursday through Friday.
  async spotlightNextSeries() {
    this.logger.log(`The cronjob to spotlight the next series was called...`);
    await this.spotlightService.spotlightNextSeries();
  }
}
