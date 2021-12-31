import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_QUEUE } from '../queue';
import { GithubLocationService } from './github-location.service';

@Processor(GITHUB_QUEUE)
export class GithubLocationProcessor {
  constructor(private readonly locationService: GithubLocationService) {}
  private logger = new Logger(GithubLocationProcessor.name);

  @Process('discover-by-location')
  async discoverByLocationProcess() {
    this.logger.log(
      'Starting the discovery of repositories based on location...'
    );
    await this.locationService.getIranianOwnersVoraciously();
  }
}
