import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RepositorySpotlightScheduler {
  @Cron(CronExpression.EVERY_10_SECONDS)
  async sendToSocialMedia() {
    // TODO: stuff
  }
}
