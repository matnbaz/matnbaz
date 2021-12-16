import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class GithubReadmeExtractorService {
  constructor(private readonly prisma: PrismaService) {}
  private logger = new Logger(GithubReadmeExtractorService.name);

  async extractAllReadmes() {
    const repos = await this.prisma.repository.findMany({
      where: { blockedAt: null },
      select: { id: true },
    });

    for (const repo of repos) await this.extractReadme(repo.id);
  }

  async extractReadme(id: string) {
    const { Owner, defaultBranch, name } =
      await this.prisma.repository.findUnique({
        where: { id },
        select: {
          name: true,
          defaultBranch: true,
          Owner: { select: { login: true } },
        },
      });
    // `https://raw.githubusercontent.com/alitnk/monopay/main/README.md`
    try {
      const response = await axios.get(
        `https://raw.githubusercontent.com/${Owner.login}/${name}/${defaultBranch}/README.md`
      );

      await this.prisma.repository.update({
        where: { id },
        data: { readme: response.data },
      });

      this.logger.log(
        `Successfully extracted and updated README for ${Owner.login}/${name}`
      );
    } catch (e) {
      this.logger.error(
        `Could not extract the README for ${Owner.login}/${name}. error message: ${e.message}`
      );
    }
  }
}
