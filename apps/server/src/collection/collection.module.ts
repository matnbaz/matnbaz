import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { MAIN_QUEUE } from '../queue';
import { CollectionPuppeteerService } from './collection-puppeteer.service';
import { CollectionCommand } from './collection.command';
import { CollectionController } from './collection.controller';
import { CollectionProcessor } from './collection.processor';
import { CollectionResolver } from './collection.resolver';
import { CollectionScheduler } from './collection.scheduler';
import { CollectionService } from './collection.service';

@Module({
  imports: [CacheModule, BullModule.registerQueue({ name: MAIN_QUEUE })],
  providers: [
    CollectionService,
    CollectionProcessor,
    CollectionScheduler,
    CollectionResolver,
    CollectionCommand,
    CollectionPuppeteerService,
  ],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
