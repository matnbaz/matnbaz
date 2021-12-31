import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIN_QUEUE } from '../queue';
import { CollectionCommand } from './collection.command';
import { CollectionProcessor } from './collection.processor';
import { CollectionResolver } from './collection.resolver';
import { CollectionScheduler } from './collection.scheduler';
import { CollectionService } from './collection.service';

@Module({
  imports: [BullModule.registerQueue({ name: MAIN_QUEUE })],
  providers: [
    CollectionService,
    CollectionProcessor,
    CollectionScheduler,
    CollectionResolver,
    CollectionCommand,
  ],
  exports: [CollectionService],
})
export class CollectionModule {}
