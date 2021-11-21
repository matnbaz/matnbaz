import { Module } from '@nestjs/common';
import { RepositoryResolver } from './repository.resolver';

@Module({
  providers: [RepositoryResolver],
})
export class RepositoryModule {}
