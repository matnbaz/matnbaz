import { Command, CommandRunner } from 'nest-commander';
import { GithubLocationService } from './github-location.service';

@Command({ name: 'discover-by-location' })
export class GithubLocationCommand implements CommandRunner {
  constructor(private readonly githubLocationService: GithubLocationService) {}

  run(passedParams: string[], options?: Record<string, any>): Promise<void> {
    return this.githubLocationService.getIranianOwnersVoraciously();
  }
}
