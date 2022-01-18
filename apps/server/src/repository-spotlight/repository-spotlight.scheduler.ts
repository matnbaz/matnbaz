import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class RepositorySpotlightScheduler {
  @Cron('0 21 * * 4-5') // At 21:00 on every day-of-week from Thursday through Friday.
  async spotlightNextRepo() {
    // TODO: stuff
  }
}
