import { Module } from '@nestjs/common';
import { MarkdownModule } from '../markdown/markdown.module';
import { RepositoryResolver } from './repository.resolver';

@Module({
  imports: [MarkdownModule],
  providers: [RepositoryResolver],
})
export class RepositoryModule {}
