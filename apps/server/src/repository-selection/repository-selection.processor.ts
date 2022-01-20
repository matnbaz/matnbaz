import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';
import { RepositorySelectionService } from './repository-selection.service';

@Processor(MAIN_QUEUE)
export class RepositorySelectionProcessor {
  constructor(private readonly selectionService: RepositorySelectionService) {}
  private logger = new Logger(RepositorySelectionProcessor.name);

  @Process(MAIN_PROCESSES.ADD_SELECTION)
  async addSelectionProcess(
    job: Job<{ repos: string[]; description?: string }>
  ) {
    this.logger.log(`Starting the process for "add selection repo"...`);

    await this.selectionService.addSelectionRepo(
      job.data.repos,
      job.data.description
    );
  }

  @Process(MAIN_PROCESSES.FEATURE_SELECTION)
  async featureSelectionProcess(job: Job<{ id: string }>) {
    this.logger.log(`Starting the process of "featuring selection"...`);

    await this.selectionService.featureSelection(job.data.id);
  }
}
