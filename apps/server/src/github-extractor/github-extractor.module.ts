import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_QUEUE } from '../queue';
import { GithubExtractorController } from './github-extractor.controller';
import { GithubExtractorProcessor } from './github-extractor.processor';
import { GithubExtractorScheduler } from './github-extractor.scheduler';
import { GithubExtractorService } from './github-extractor.service';
import { GithubReadmeExtractorService } from './github-readme-extractor.service';

@Module({
  imports: [BullModule.registerQueue({ name: GITHUB_QUEUE }), OctokitModule],
  providers: [
    GithubExtractorProcessor,
    GithubExtractorScheduler,
    GithubExtractorService,
    GithubReadmeExtractorService,
  ],
  controllers: [GithubExtractorController],
  exports: [GithubReadmeExtractorService],
})
export class GithubExtractorModule {}
