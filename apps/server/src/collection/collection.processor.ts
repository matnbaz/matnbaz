import { Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { MAIN_PROCESSES, MAIN_QUEUE } from '../queue';
import { CollectionService } from './collection.service';

@Processor(MAIN_QUEUE)
export class CollectionProcessor {
  constructor(private readonly collector: CollectionService) {}
  private logger = new Logger(CollectionProcessor.name);

  @Process(MAIN_PROCESSES.COLLECT_COLLECTIONS)
  async collectProcess() {
    this.logger.log('Starting collecting the repositories...');

    await this.collector.collectAllCollections();
  }
}
