import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { OctokitModule } from '../octokit/octokit.module';
import { GITHUB_EXTRACTOR_QUEUE } from './constants';
import { GithubExtractorController } from './github-extractor.controller';
import { GithubExtractorProcessor } from './github-extractor.processor';
import { GithubExtractorScheduler } from './github-extractor.scheduler';
import { GithubExtractorService } from './github-extractor.service';

@Module({
  imports: [
    BullModule.registerQueue({ name: GITHUB_EXTRACTOR_QUEUE }),
    OctokitModule,
  ],
  providers: [
    GithubExtractorProcessor,
    GithubExtractorScheduler,
    GithubExtractorService,
  ],
  controllers: [GithubExtractorController],
})
export class GithubExtractorModule {}
