import { Injectable, Logger } from '@nestjs/common';
import { OctokitService } from 'nestjs-octokit';
import { PrismaService } from 'nestjs-prisma';
import { MarkdownService } from '../markdown/markdown.service';

@Injectable()
export class GithubReadmeExtractorService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly octokit: OctokitService,
    private readonly markdownService: MarkdownService
  ) {}
  private logger = new Logger(GithubReadmeExtractorService.name);

  async extractAllReadmes() {
    const repos = await this.prisma.repository.findMany({
      where: { blockedAt: null },
      select: { id: true },
    });

    for (const repo of repos) await this.extractReadme(repo.id);
  }

  async extractReadme(id: string) {
    try {
      const { Owner, defaultBranch, name } =
        await this.prisma.repository.findUnique({
          where: { id },
          select: {
            name: true,
            defaultBranch: true,
            Owner: { select: { login: true } },
          },
        });
      const readme = await this.getReadmeFromGithub(
        Owner.login,
        name,
        defaultBranch
      );
      await this.prisma.repository.update({
        where: { id },
        data: {
          readme,
          readmeHtml: readme
            ? this.markdownService.renderForGithub(
                readme,
                Owner.login,
                name,
                defaultBranch
              )
            : undefined,
        },
      });
    } catch (e) {
      //
    }
  }

  async getReadmeFromGithub(ownerLogin, repoName, defaultBranch) {
    try {
      const response = await this.octokit.rest.repos.getReadme({
        owner: ownerLogin,
        repo: repoName,
      });
      const readme = Buffer.from(response.data.content, 'base64').toString(
        'utf-8'
      );
      return readme;
    } catch (e) {
      return null;
    }
  }
}
