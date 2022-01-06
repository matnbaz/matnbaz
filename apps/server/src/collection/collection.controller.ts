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
import { PrismaService } from 'nestjs-prisma';
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

    const collection = await this.prisma.collection.findUnique({
      where: { slug: collectionSlug },
      include: { Collects: { select: { id: true } } },
    });

    if (!collection)
      throw new NotFoundException('The requested collection does not exist.');

    response.setHeader('Content-Type', 'image/jpeg');
    const image = await this.cacheManager.wrap<string>(
      `collectionImage-${collection.slug}`,
      async () => {
        const buffer =
          await this.collectionPuppeteerService.generateCollectionThumbnail(
            collection,
            collection.Collects.length
          );
        console.log('this does not get called!!');
        return buffer.toString('base64');
      },
      { ttl: 604800 } // A week
    );

    const buffer = Buffer.from(image, 'base64');
    response.send(buffer);
  }
}
