import { Command, CommandRunner } from 'nest-commander';
import { GithubDiscovererService } from './github-discoverer.service';

@Command({ name: 'discover' })
export class GithubDiscovererCommand implements CommandRunner {
  constructor(
    private readonly githubDiscovererService: GithubDiscovererService
  ) {}

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    return this.githubDiscovererService.discoverByPredefinedTerms();
  }
}
