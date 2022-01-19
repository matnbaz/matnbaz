import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Query,
  Res,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { PrismaService } from 'nestjs-prisma';
import { RepositorySpotlightPuppeteerService } from './repository-spotlight-puppeteer.service';

@Controller('/repository-spotlights')
export class RepositorySpotlightController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repositorySpotlightPuppeteerService: RepositorySpotlightPuppeteerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(':id.:format')
  async getJpeg(
    @Param('id') id: string,
    @Param('format') format: string,
    @Query('square') isSquare: boolean,
    @Res() response: Response
  ) {
    if (!['jpg', 'jpeg'].includes(format))
      throw new NotFoundException('We do not serve this image extension');

    const repositorySpotlight =
      await this.prisma.repositorySpotlight.findUnique({
        where: { id },
        include: { Repositories: { include: { Owner: true } } },
      });

    if (!repositorySpotlight)
      throw new NotFoundException('The requested id does not exist.');

    response.setHeader('Content-Type', 'image/jpeg');
    const image = await this.cacheManager.wrap<string>(
      `repositorySpotlightImage${isSquare ? 'Square' : ''}-${
        repositorySpotlight.id
      }`,
      async () => {
        const buffer =
          await this.repositorySpotlightPuppeteerService.generateRepositorySpotlightThumbnail(
            repositorySpotlight,
            isSquare
          );
        return buffer.toString('base64');
      },
      { ttl: 604800 } // 1 week
    );

    const buffer = Buffer.from(image, 'base64');
    response.send(buffer);
  }
}
