import { Module } from '@nestjs/common';
import { ExtractorGhScheduler } from './extractor-gh.scheduler';
import { ExtractorGhService } from './extractor-gh.service';

@Module({
  providers: [ExtractorGhService, ExtractorGhScheduler],
})
export class ExtractorGhModule {}
