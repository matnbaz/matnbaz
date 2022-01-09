import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { GithubModule } from '../github/github.module';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';
import { GithubRepositoryCommand } from './github-repository.command';
import { GithubRepositoryProcessor } from './github-repository.processor';
import { GithubRepositoryScheduler } from './github-repository.scheduler';
import { GithubRepositoryService } from './github-repository.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_QUEUE }),
    OctokitModule,
    GithubModule,
  ],
  providers: [
    GithubRepositoryProcessor,
    GithubRepositoryScheduler,
    GithubRepositoryService,
    GithubReadmeExtractorService,
    GithubRepositoryCommand,
  ],
  exports: [GithubReadmeExtractorService],
})
export class GithubRepositoryModule {}
