import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Processor(MAIN_QUEUE)
export class RepositorySpotlightProcessor {
  constructor(private readonly spotlightService: RepositorySpotlightService) {}

  @Process(MAIN_PROCESSES.ADD_SPOTLIGHT)
  async addSpotlightRepo(job: Job<{ repos: string[]; description?: string }>) {
    await this.spotlightService.addSpotlightRepo(
      job.data.repos,
      job.data.description
    );
  }
}
