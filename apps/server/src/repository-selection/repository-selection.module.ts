import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { RepositorySelectionController } from './repository-selection-controller';
import { RepositorySelectionPuppeteerService } from './repository-selection-puppeteer.service';
import { RepositorySelectionProcessor } from './repository-selection.processor';
import { RepositorySelectionResolver } from './repository-selection.resolver';
import { RepositorySelectionScheduler } from './repository-selection.scheduler';
import { RepositorySelectionService } from './repository-selection.service';

@Module({
  imports: [CacheModule],
  providers: [
    RepositorySelectionResolver,
    RepositorySelectionService,
    RepositorySelectionProcessor,
    RepositorySelectionScheduler,
    RepositorySelectionPuppeteerService,
  ],
  controllers: [RepositorySelectionController],
  exports: [RepositorySelectionService],
})
export class RepositorySelectionModule {}
