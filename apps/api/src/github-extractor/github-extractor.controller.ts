import { Controller, Get } from '@nestjs/common';
import { GithubExtractorScheduler } from './github-extractor.scheduler';

@Controller('github')
export class GithubExtractorController {
  constructor(private readonly scheduler: GithubExtractorScheduler) {}

  @Get('extract')
  async extract() {
    if (process.env.NODE_ENV === 'development') {
      await this.scheduler.extract();
    }
  }

  @Get('flush')
  async flush() {
    if (process.env.NODE_ENV === 'development') {
      this.scheduler.flushQueue();
    }
  }
}
