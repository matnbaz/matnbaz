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
import { RepositorySelectionPuppeteerService } from './repository-selection-puppeteer.service';

@Controller('/repository-selections')
export class RepositorySelectionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly repositorySelectionPuppeteerService: RepositorySelectionPuppeteerService,
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

    const repositorySelection =
      await this.prisma.repositorySelection.findUnique({
        where: { id },
        include: { Repositories: { include: { Owner: true } } },
      });

    if (!repositorySelection)
      throw new NotFoundException('The requested id does not exist.');

    response.setHeader('Content-Type', 'image/jpeg');
    const image = await this.cacheManager.wrap<string>(
      `repositorySelectionImage${isSquare ? 'Square' : ''}-${
        repositorySelection.id
      }`,
      async () => {
        const buffer =
          await this.repositorySelectionPuppeteerService.generateRepositorySelectionThumbnail(
            repositorySelection,
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
