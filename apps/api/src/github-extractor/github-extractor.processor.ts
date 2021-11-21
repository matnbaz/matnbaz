import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { GITHUB_EXTRACTOR_QUEUE } from './constants';
import { GithubExtractorService } from './github-extractor.service';

@Processor(GITHUB_EXTRACTOR_QUEUE)
export class GithubExtractorProcessor {
  constructor(private readonly extractor: GithubExtractorService) {}
  private logger = new Logger(GithubExtractorProcessor.name);

  @Process('extract')
  async extractProcess() {
    this.logger.log('Starting the extraction of repositories...');
    this.extractor.extractAllOwners();
  }
}
