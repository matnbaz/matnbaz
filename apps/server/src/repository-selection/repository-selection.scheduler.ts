import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RepositorySelectionService } from './repository-selection.service';

@Injectable()
export class RepositorySelectionScheduler {
  constructor(private readonly selectionService: RepositorySelectionService) {}
  private logger = new Logger(RepositorySelectionScheduler.name);

  @Cron('0 21 * * 4-5') // At 21:00 on every day-of-week from Thursday through Friday.
  async selectionNextSeries() {
    this.logger.log(`The cronjob to selection the next series was called...`);
    await this.selectionService.featureNextSelection();
  }
}
