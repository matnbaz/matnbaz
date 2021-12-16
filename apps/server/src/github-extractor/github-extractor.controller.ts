import { Controller, Get } from '@nestjs/common';
import { GithubExtractorScheduler } from './github-extractor.scheduler';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';

@Controller('github/extract')
export class GithubExtractorController {
  constructor(
    private readonly scheduler: GithubExtractorScheduler,
    private readonly readmeExt: GithubReadmeExtractorService
  ) {}

  @Get('/')
  extract() {
    if (process.env.NODE_ENV === 'production') return 'nah';
    this.scheduler.extract();
  }
}
