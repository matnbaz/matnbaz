import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Processor(MAIN_QUEUE)
export class RepositorySpotlightProcessor {
  constructor(private readonly spotlightService: RepositorySpotlightService) {}

  @Process(MAIN_PROCESSES.SPOTLIGHT_REPOSITORY)
  async spotlightRepo(job: Job<{ id: string }>) {
    await this.spotlightService.spotlight(job.data.id);
  }
}
