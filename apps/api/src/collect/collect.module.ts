import { Module } from '@nestjs/common';
import { CollectResolver } from './collect.resolver';

@Module({
  providers: [CollectResolver],
})
export class CollectModule {}
