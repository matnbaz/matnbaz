import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Processor(MAIN_QUEUE)
export class RepositorySpotlightProcessor {
  constructor(private readonly spotlightService: RepositorySpotlightService) {}
  private logger = new Logger(RepositorySpotlightProcessor.name);

  @Process(MAIN_PROCESSES.ADD_SPOTLIGHT)
  async addSpotlightRepo(job: Job<{ repos: string[]; description?: string }>) {
    this.logger.log(`Starting the process for "add spotlight repo"...`);

    await this.spotlightService.addSpotlightRepo(
      job.data.repos,
      job.data.description
    );
  }
}
