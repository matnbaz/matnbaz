import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubExtractorCommand } from './github-extractor.command';
import { GithubExtractorProcessor } from './github-extractor.processor';
import { GithubExtractorScheduler } from './github-extractor.scheduler';
import { GithubExtractorService } from './github-extractor.service';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_QUEUE }),
    OctokitModule,
    GithubModule,
  ],
  providers: [
    GithubExtractorProcessor,
    GithubExtractorScheduler,
    GithubExtractorService,
    GithubReadmeExtractorService,
    GithubExtractorCommand,
  ],
  exports: [GithubReadmeExtractorService],
})
export class GithubExtractorModule {}
