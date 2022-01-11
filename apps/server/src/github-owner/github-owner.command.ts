import { Command, CommandRunner } from 'nest-commander';
import { GithubOwnerService } from './github-owner.service';

@Command({ name: 'extract-owners' })
export class GithubExtractOwnerCommand implements CommandRunner {
  constructor(private readonly githubOwnerService: GithubOwnerService) {}

  async run(
    passedParams: string[],
    options?: Record<string, any>
  ): Promise<void> {
    await this.githubOwnerService.updateAllOwnersStatistics();
  }
}
