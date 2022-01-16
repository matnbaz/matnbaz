import { Module } from '@nestjs/common';
import { RepositorySpotlightProcessor } from './repository-spotlight.processor';
import { RepositorySpotlightScheduler } from './repository-spotlight.scheduler';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Module({
  imports: [],
  providers: [
    RepositorySpotlightService,
    RepositorySpotlightProcessor,
    RepositorySpotlightScheduler,
  ],
})
export class RepositorySpotlightModule {}
