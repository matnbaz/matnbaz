import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MAIN_QUEUE } from '../../queue';
import { CollectionController } from './collection.controller';
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
  ],
  controllers: [CollectionController],
  exports: [CollectionService],
})
export class CollectionModule {}
