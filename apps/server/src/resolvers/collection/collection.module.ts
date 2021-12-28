import { Module } from '@nestjs/common';
import { CollectionResolver } from './collection.resolver';

@Module({
  providers: [CollectionResolver],
})
export class CollectionModule {}
