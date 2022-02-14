import { persianNumbers } from '@matnbaz/common';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Collection } from '@prisma/client';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { PrismaService } from 'nestjs-prisma';
import { join } from 'path';
import * as puppeteer from 'puppeteer';

@Injectable()
export class CollectionPuppeteerService {
  constructor(private readonly prisma: PrismaService) {}

  async retrieveCollectionThumbnail(collectionSlug: string, cache = true) {
    const filePath = join(
      __dirname,
      `../../../storage/server/collection-${collectionSlug}.jpg`
    );
    const fileExists = existsSync(filePath);

    if (!fileExists || !cache) {
      const collection = await this.prisma.collection.findUnique({
        where: { slug: collectionSlug },
        include: { Collects: { select: { id: true } } },
      });

      if (!collection)
        throw new NotFoundException('The requested collection does not exist.');

      const image = await this.generateCollectionThumbnail(
        collection,
        collection.Collects.length
      );
      writeFileSync(filePath, image);
    }

    const existingFile = readFileSync(filePath);
    return Buffer.from(existingFile);
  }

  async generateCollectionThumbnail(
    { color, name, slug, image }: Collection,
    reposCount: number
  ) {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width: 1280, height: 640 },
    });
    const page = await browser.newPage();

    await page.setContent(
      `
    <!DOCTYPE html>
<html dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              primary: {
                50: '#f4f9ff',
                100: '#e9f4ff',
                200: '#c7e3ff',
                300: '#a5d3ff',
                400: '#62b1ff',
                500: '#1e90ff',
                600: '#1b82e6',
                700: '#176cbf',
                800: '#125699',
                900: '#0f477d',
              },
            },
            fontFamily: {
              sans: ['Vazir', 'sans-serif'],
              mono: ['"Vazir Code"', 'monospace'],
            },
          },
        },
      };
    </script>
    <link
      type="text/css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font@v30.1.0/dist/font-face.css"
    />
  </head>
  <body class="bg-gray-100 flex items-center justify-center">
    <div class="relative p-24 w-[1280px] h-[640px] bg-white overflow-hidden">
      <div
        class="
          absolute
          bottom-[-350px]
          right-[-500px]
          rounded-full
          bg-[${color}]
          w-[1000px]
          h-[500px]
        "
      ></div>
      <div
        class="
          absolute
          top-[-350px]
          left-[-500px]
          rounded-full
          bg-[${color}]
          w-[1000px]
          h-[500px]
        "
      ></div>
      
      <p class="absolute left-6 bottom-4 text-gray-700">matnbaz.net/c/${slug}</p>
      <div class="relative grid grid-cols-2 h-full">
        <div class="self-center">
          <div class="flex items-center space-x-4 space-x-reverse">
            <div class="bg-[${color}] w-14 h-14 rounded-full flex-shrink-0"></div>
            <h1 dir="ltr" class="text-7xl font-extrabold text-right">${name}</h1>
          </div>
          <h3 class="mt-6 text-4xl font-medium text-gray-700 leading-relaxed">
            با ${persianNumbers(
              reposCount,
              true
            )} پروژه اپن‌سورس ایرانی با موضوع ${name} آشنا شوید!
          </h3>
        </div>
        <div class="self-center place-self-center">
          <img src="${image}" class="w-72 h-72 pr-12" />
        </div>
      </div>
    </div>
  </body>
</html>
`,
      {
        timeout: 200000,
      }
    );
    const screenshot = await page.screenshot({
      omitBackground: true,
      type: 'jpeg',
    });
    await browser.close();
    return screenshot;
  }
}
