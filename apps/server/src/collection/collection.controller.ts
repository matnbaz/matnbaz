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
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { PrismaService } from 'nestjs-prisma';
import { join } from 'path';
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
    let buffer;
    const filePath = join(
      __dirname,
      `../../../storage/server/collection-${collectionSlug}.jpg`
    );
    const fileExists = existsSync(filePath);

    if (fileExists) {
      const existingFile = readFileSync(filePath);
      buffer = existingFile;
      buffer = Buffer.from(existingFile.toString(), 'base64');
    } else {
      if (!['jpg', 'jpeg'].includes(format))
        throw new NotFoundException('We do not serve this image extension');

      const collection = await this.prisma.collection.findUnique({
        where: { slug: collectionSlug },
        include: { Collects: { select: { id: true } } },
      });

      if (!collection)
        throw new NotFoundException('The requested collection does not exist.');

      const image =
        await this.collectionPuppeteerService.generateCollectionThumbnail(
          collection,
          collection.Collects.length
        );

      writeFileSync(filePath, image);
      buffer = Buffer.from(image.toString(), 'base64');
    }

    response.setHeader('Content-Type', 'image/jpeg');
    response.send(buffer);
  }
}
