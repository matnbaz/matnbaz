import { Module } from '@nestjs/common';
import { GithubRepositoryModule } from '../github-repository/github-repository.module';
import { RepositoryResolver } from './repository.resolver';

@Module({
  imports: [GithubRepositoryModule],
  providers: [RepositoryResolver],
})
export class RepositoryModule {}
