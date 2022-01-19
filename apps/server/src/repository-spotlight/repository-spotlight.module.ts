import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { RepositorySpotlightController } from './repository-spotlight-controller';
import { RepositorySpotlightPuppeteerService } from './repository-spotlight-puppeteer.service';
import { RepositorySpotlightProcessor } from './repository-spotlight.processor';
import { RepositorySpotlightResolver } from './repository-spotlight.resolver';
import { RepositorySpotlightScheduler } from './repository-spotlight.scheduler';
import { RepositorySpotlightService } from './repository-spotlight.service';

@Module({
  imports: [CacheModule],
  providers: [
    RepositorySpotlightResolver,
    RepositorySpotlightService,
    RepositorySpotlightProcessor,
    RepositorySpotlightScheduler,
    RepositorySpotlightPuppeteerService,
  ],
  controllers: [RepositorySpotlightController],
  exports: [RepositorySpotlightService],
})
export class RepositorySpotlightModule {}
