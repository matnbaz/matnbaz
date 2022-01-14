import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class RepositorySpotlightScheduler {
  @Cron(CronExpression.EVERY_6_HOURS)
  sendToSocialMedia() {
    // TODO: handle telegram, instagram, discord and twitter here
  }
}
