import { Module } from '@nestjs/common';
import { GithubExtractorModule } from '../../github-extractor/github-extractor.module';
import { RepositoryResolver } from './repository.resolver';

@Module({
  imports: [GithubExtractorModule],
  providers: [RepositoryResolver],
})
export class RepositoryModule {}
