import { MonomediaService } from '@matnbaz/monomedia';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class RepositorySpotlightService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly monomedia: MonomediaService
  ) {}

  addSpotlightRepo(repoId: string, description?: string) {
    this.prisma.repositorySpotlight.create({
      data: {
        Repository: { connect: { id: repoId } },
        description,
      },
    });
  }

  async spotlight(id: string) {
    const spotlight = await this.prisma.repositorySpotlight.update({
      where: { id },
      data: {
        spotlightedAt: new Date(),
      },
      include: { Repository: { include: { Owner: true } } },
    });

    const fullName = `${spotlight.Repository.Owner.login}/${spotlight.Repository.name}`;

    // Discord
    await this.monomedia.discord.sendMessage(
      `پروژه منتخب امروز: **${fullName}**
      
      https://matnbaz.net/github/${fullName}
      `
    );

    await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { sentOnDiscord: true },
    });

    // Telegram
    await this.monomedia.telegram.sendMessage(
      `پروژه منتخب امروز: **${fullName}**
      
      https://matnbaz.net/github/${fullName}
      `
    );

    await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { sentOnTelegram: true },
    });

    // Instagram
    await this.monomedia.instagram.sendPhoto(
      '',
      `پروژه منتخب امروز: **${fullName}**
      
      https://matnbaz.net/github/${fullName}
      `
    );

    await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { sentOnInstagram: true },
    });

    // Twitter
    await this.monomedia.twitter.sendMessage(
      `پروژه منتخب امروز: **${fullName}**
      
      https://matnbaz.net/github/${fullName}
      `
    );

    await this.prisma.repositorySpotlight.update({
      where: { id },
      data: { sentOnTwitter: true },
    });
  }
}
