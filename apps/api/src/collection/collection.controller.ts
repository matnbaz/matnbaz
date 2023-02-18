import {
  CACHE_MANAGER,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Response } from 'express';
import { PrismaService } from '../persistence/prisma/prisma.service';
import { CollectionPuppeteerService } from './collection-puppeteer.service';

@Controller('/collections')
export class CollectionController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly collectionPuppeteerService: CollectionPuppeteerService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) {}

  @Get(':collectionSlug.:format')
  async getJpeg(
    @Param('collectionSlug') collectionSlug: string,
    @Param('format') format: string,
    @Res() response: Response
  ) {
    if (!['jpg', 'jpeg'].includes(format))
      throw new NotFoundException('We do not serve this image extension');

    const buffer =
      await this.collectionPuppeteerService.retrieveCollectionThumbnail(
        collectionSlug
      );

    response.setHeader('Content-Type', 'image/jpeg');
    response.send(buffer);
  }
}
