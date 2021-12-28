import { Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { CollectionService } from './collection.service';

export class CollectionProcessor {
  constructor(private readonly collector: CollectionService) {}
  private logger = new Logger(CollectionProcessor.name);

  @Process('collect')
  async collectProcess() {
    this.logger.log('Starting collecting the repositories...');
    this.collector.collectAllCollections();
  }
}
