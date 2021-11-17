import { Module } from '@nestjs/common';
import { OwnerResolver } from './owner.resolver';

@Module({
  providers: [OwnerResolver],
})
export class OwnerModule {}
