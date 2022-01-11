import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_PROCESSES, GITHUB_QUEUE } from '../queue';
import { GithubExtractorService } from './github-extractor.service';

@Processor(GITHUB_QUEUE)
export class GithubExtractorProcessor {
  constructor(private readonly extractorService: GithubExtractorService) {}
  private logger = new Logger(GithubExtractorProcessor.name);

  @Process(GITHUB_PROCESSES.EXTRACT)
  async extractProcess() {
    this.logger.log('Starting the extraction of repositories...');

    await this.extractorService.fullExtract();
  }
}
