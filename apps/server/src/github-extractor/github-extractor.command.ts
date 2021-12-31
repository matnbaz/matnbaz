import { Command, CommandRunner } from 'nest-commander';
import { GithubExtractorService } from './github-extractor.service';

@Command({ name: 'extract' })
export class GithubExtractorCommand implements CommandRunner {
  constructor(
    private readonly githubExtractorService: GithubExtractorService
  ) {}

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    return this.githubExtractorService.extractAllOwners();
  }
}
