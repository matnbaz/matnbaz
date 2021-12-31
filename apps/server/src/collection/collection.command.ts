import { Command, CommandRunner } from 'nest-commander';
import { CollectionService } from './collection.service';

@Command({ name: 'collect' })
export class CollectionCommand implements CommandRunner {
  constructor(private readonly collectionService: CollectionService) {}

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    return this.collectionService.collectAllCollections();
  }
}
