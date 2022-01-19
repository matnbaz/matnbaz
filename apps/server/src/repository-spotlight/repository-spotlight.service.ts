import { persianNumbers } from '@matnbaz/common';
import { MonomediaService } from '@matnbaz/monomedia';
import { Injectable, Logger } from '@nestjs/common';
import { format } from 'date-fns-jalali';
import { PrismaService } from 'nestjs-prisma';
import { SpotlightWithRepoAndOwner } from './repository-spotlight.types';

@Injectable()
export class RepositorySpotlightService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly monomedia: MonomediaService
  ) {}
  private logger = new Logger(RepositorySpotlightService.name);

  async addSpotlightRepo(reposIds: string[], description?: string) {
    await this.prisma.repositorySpotlight.create({
      data: {
        Repositories: { connect: reposIds.map((id) => ({ id })) },
        description,
      },
    });
  }

  async spotlightNextSeries() {
    const spotlight = await this.prisma.repositorySpotlight.findFirst({
      where: { spotlightedAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!spotlight) {
      this.logger.warn(`No spotlight was found. returning now.`);
      return;
    }

    return await this.spotlight(spotlight.id);
  }

  async spotlight(id: string) {
    const spotlight = await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { spotlightedAt: new Date() },
      include: { Repositories: { include: { Owner: true } } },
    });

    try {
      if (!spotlight.sentOnDiscord) await this.sendToDiscord(spotlight);
    } catch (e) {
      this.logger.error(`Failed to send spotlight message on discord: ${e}`);
    }

    try {
      if (!spotlight.sentOnTelegram) await this.sendToTelegram(spotlight);
    } catch (e) {
      this.logger.error(`Failed to send spotlight message on telegram: ${e}`);
    }

    try {
      if (!spotlight.sentOnTwitter) await this.sendToTwitter(spotlight);
    } catch (e) {
      this.logger.error(`Failed to send spotlight message on twitter: ${e}`);
    }

    try {
      if (!spotlight.sentOnInstagram) await this.sendToInstagram(spotlight);
    } catch (e) {
      this.logger.error(`Failed to send spotlight message on instagram: ${e}`);
    }
  }

  private async sendToDiscord(spotlight: SpotlightWithRepoAndOwner) {
    await this.monomedia.discord.sendMessage(this.createMessage(spotlight));

    await this.prisma.repositorySpotlight.update({
      where: { id: spotlight.id },
      data: { sentOnDiscord: true },
    });
  }

  private async sendToTelegram(spotlight: SpotlightWithRepoAndOwner) {
    await this.monomedia.telegram.sendMessage(this.createMessage(spotlight));

    await this.prisma.repositorySpotlight.update({
      where: { id: spotlight.id },
      data: { sentOnTelegram: true },
    });
  }

  private async sendToInstagram(spotlight: SpotlightWithRepoAndOwner) {
    await this.monomedia.instagram.sendPhoto(this.createMessage(spotlight));

    await this.prisma.repositorySpotlight.update({
      where: { id: spotlight.id },
      data: { sentOnInstagram: true },
    });
  }

  private async sendToTwitter(spotlight: SpotlightWithRepoAndOwner) {
    await this.monomedia.twitter.sendMessage(
      this.createMessage(spotlight, true)
    );

    await this.prisma.repositorySpotlight.update({
      where: { id: spotlight.id },
      data: { sentOnTwitter: true },
    });
  }

  private createMessage(
    spotlight: SpotlightWithRepoAndOwner,
    tagTwitter = false
  ) {
    const repos = spotlight.Repositories;
    let text = '🔹 ';
    if (repos.length === 0) throw new Error('No repository was provided.');
    else if (repos.length === 1) {
      text += 'پروژه منتخب امروز';
    } else {
      text += 'پروژه‌های منتخب امروز';
    }
    text += ` - ${persianNumbers(format(new Date(), 'EEEE y/M/d'))}`;
    text += ' 🔹\n\n';

    for (const repo of repos) {
      text += `${repo.Owner.login}/${repo.name}`;

      if (tagTwitter && repo.Owner.twitterUsername)
        text += ` @${repo.Owner.twitterUsername}`;

      text += '\n';
    }
    text += '\n';
    text += `https://matnbaz.net/s/${spotlight.id}`;

    return text;
  }
}
