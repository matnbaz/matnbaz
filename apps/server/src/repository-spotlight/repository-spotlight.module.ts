import { Module } from '@nestjs/common';
import { RepositorySpotlightProcessor } from './repository-spotlight.processor';
import { RepositorySpotlightResolver } from './repository-spotlight.resolver';
import { RepositorySpotlightScheduler } from './repository-spotlight.scheduler';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Module({
  imports: [],
  providers: [
    RepositorySpotlightResolver,
    RepositorySpotlightService,
    RepositorySpotlightProcessor,
    RepositorySpotlightScheduler,
  ],
})
export class RepositorySpotlightModule {}
