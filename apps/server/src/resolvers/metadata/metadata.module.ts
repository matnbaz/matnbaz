import { Module } from '@nestjs/common';
import { MetadataResolver } from './metadata.resolver';

@Module({
  providers: [MetadataResolver],
})
export class MetadataModule {}
