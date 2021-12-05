import { Controller } from '@nestjs/common';
import { GithubExtractorScheduler } from './github-extractor.scheduler';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';

@Controller('github')
export class GithubExtractorController {
  constructor(
    private readonly scheduler: GithubExtractorScheduler,
    private readonly readmeExt: GithubReadmeExtractorService
  ) {}
}
