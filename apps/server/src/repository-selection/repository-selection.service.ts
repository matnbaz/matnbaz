import { persianNumbers } from '@matnbaz/common';
import { MonomediaService } from '@matnbaz/monomedia';
import { Injectable, Logger } from '@nestjs/common';
import { format, subHours } from 'date-fns-jalali';
import { PrismaService } from 'nestjs-prisma';
import { SelectionWithRepoAndOwner } from './repository-selection.types';

@Injectable()
export class RepositorySelectionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly monomedia: MonomediaService
  ) {}
  private logger = new Logger(RepositorySelectionService.name);

  async addSelectionRepo(reposIds: string[], description?: string) {
    await this.prisma.repositorySelection.create({
      data: {
        Repositories: { connect: reposIds.map((id) => ({ id })) },
        description,
      },
    });
  }

  async featureNextSelection() {
    const lastFeature = await this.prisma.repositorySelection.findFirst({
      orderBy: { featuredAt: 'desc' },
    });
    if (lastFeature && lastFeature.featuredAt > subHours(new Date(), 12)) {
      this.logger.warn(
        `Last selection was featured withing last 12 hours. returning now.`
      );
      return;
    }

    const selection = await this.prisma.repositorySelection.findFirst({
      where: { featuredAt: null },
      orderBy: { createdAt: 'desc' },
    });

    if (!selection) {
      this.logger.warn(`No selection was found. returning now.`);
      return;
    }

    return await this.featureSelection(selection.id);
  }

  async featureSelection(id: string) {
    const selection = await this.prisma.repositorySelection.update({
      where: { id },
      data: { featuredAt: new Date() },
      include: { Repositories: { include: { Owner: true } } },
    });

    try {
      if (!selection.sentOnDiscord) await this.sendToDiscord(selection);
    } catch (e) {
      this.logger.error(`Failed to send selection message on discord: ${e}`);
    }

    try {
      if (!selection.sentOnTelegram) await this.sendToTelegram(selection);
    } catch (e) {
      this.logger.error(`Failed to send selection message on telegram: ${e}`);
    }

    try {
      if (!selection.sentOnTwitter) await this.sendToTwitter(selection);
    } catch (e) {
      this.logger.error(`Failed to send selection message on twitter: ${e}`);
    }

    try {
      if (!selection.sentOnInstagram) await this.sendToInstagram(selection);
    } catch (e) {
      this.logger.error(`Failed to send selection message on instagram: ${e}`);
    }
  }

  private async sendToDiscord(selection: SelectionWithRepoAndOwner) {
    await this.monomedia.discord.sendMessage(this.createMessage(selection));

    await this.prisma.repositorySelection.update({
      where: { id: selection.id },
      data: { sentOnDiscord: true },
    });
  }

  private async sendToTelegram(selection: SelectionWithRepoAndOwner) {
    await this.monomedia.telegram.sendMessage(
      this.createMessage(selection, true)
    );

    await this.prisma.repositorySelection.update({
      where: { id: selection.id },
      data: { sentOnTelegram: true },
    });
  }

  private async sendToInstagram(selection: SelectionWithRepoAndOwner) {
    await this.monomedia.instagram.sendPhoto(this.createMessage(selection));

    await this.prisma.repositorySelection.update({
      where: { id: selection.id },
      data: { sentOnInstagram: true },
    });
  }

  private async sendToTwitter(selection: SelectionWithRepoAndOwner) {
    await this.monomedia.twitter.sendMessage(
      this.createMessage(selection, true)
    );

    await this.prisma.repositorySelection.update({
      where: { id: selection.id },
      data: { sentOnTwitter: true },
    });
  }

  private createMessage(
    selection: SelectionWithRepoAndOwner,
    tagTwitter = false
  ) {
    const repos = selection.Repositories;
    let text = '🔹 ';
    if (repos.length === 0) throw new Error('No repository was provided.');

    text += `پروژه${repos.length > 1 ? '‌های' : ''} منتخب #${persianNumbers(
      selection.issue.toString()
    )}`; // پروژه [های] منتخب #۲

    text += ` - ${persianNumbers(format(new Date(), 'EEEE y/M/d'))}`;
    text += ' 🔹\n\n';

    // for (const repo of repos) {
    //   text += `${repo.Owner.login}/${repo.name}`;

    //   if (tagTwitter && repo.Owner.twitterUsername)
    //     text += ` @${repo.Owner.twitterUsername}`;

    //   text += '\n';
    // }

    if (selection.description) {
      text += selection.description + '\n';
    }

    if (tagTwitter) {
      text +=
        [
          ...repos // Spreading removes duplicates
            .filter(({ Owner: { twitterUsername } }) => twitterUsername)
            .map(({ Owner: { twitterUsername } }) => '@' + twitterUsername),
        ].join(' ') + '\n';
    }

    text += '\n';
    text += `https://matnbaz.net/s/${selection.id}`;

    return text;
  }
}
