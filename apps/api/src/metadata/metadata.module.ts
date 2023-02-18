import { Module } from '@nestjs/common';
import { CacheModule } from '../cache/cache.module';
import { MetadataResolver } from './metadata.resolver';

@Module({
  imports: [CacheModule],
  providers: [MetadataResolver],
})
export class MetadataModule {}
