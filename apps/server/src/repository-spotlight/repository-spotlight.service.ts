import { MonomediaService } from '@matnbaz/monomedia';
import { Injectable } from '@nestjs/common';
import { Owner, Repository, RepositorySpotlight } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

type SpotlightWithRepoAndOwner = RepositorySpotlight & {
  Repositories: (Repository & {
    Owner: Owner;
  })[];
};

@Injectable()
export class RepositorySpotlightService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly monomedia: MonomediaService
  ) {}

  addSpotlightRepo(reposIds: string[], description?: string) {
    this.prisma.repositorySpotlight.create({
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

    return await this.spotlight(spotlight.id);
  }

  async spotlight(id: string) {
    const spotlight = await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { spotlightedAt: new Date() },
      include: { Repositories: { include: { Owner: true } } },
    });

    if (!spotlight.sentOnDiscord) await this.sendToDiscord(spotlight);
    if (!spotlight.sentOnTelegram) await this.sendToTelegram(spotlight);
    if (!spotlight.sentOnTwitter) await this.sendToTwitter(spotlight);
    if (!spotlight.sentOnInstagram) await this.sendToInstagram(spotlight);
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
    await this.monomedia.twitter.sendMessage(this.createMessage(spotlight));

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
    let text = '';
    if (repos.length === 0) throw new Error('No repository was provided.');
    else if (repos.length === 1) {
      text += 'پروژه منتخب امروز:\n';
    } else {
      text += 'پروژه‌های منتخب امروز:\n';
    }

    for (const repo of repos) {
      text += `${repo.Owner.login}/${repo.name}`;

      if (tagTwitter && repo.Owner.twitterUsername)
        text += ` توسط @${repo.Owner.twitterUsername}`;

      text += '\n';
    }
    text += '\n';
    text += `https://matnbaz.net/s/${spotlight.id}`;

    return text;
  }
}
