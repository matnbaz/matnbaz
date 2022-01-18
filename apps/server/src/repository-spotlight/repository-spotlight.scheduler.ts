import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Injectable()
export class RepositorySpotlightScheduler {
  constructor(private readonly spotlightService: RepositorySpotlightService) {}

  @Cron('0 21 * * 4-5') // At 21:00 on every day-of-week from Thursday through Friday.
  async spotlightNextRepo() {
    await this.spotlightService.spotlightNextSeries();
  }
}
