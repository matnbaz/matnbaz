import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

export interface PostImageOptions {
  title?: string;
  description?: string;
  color?: string;
  imageClasses?: string;
  imageUrl?: string;
  mode?: 'wide' | 'square';
}

@Injectable()
export class PostService {
  async render(options: PostImageOptions) {
    options.title = options.title || '';
    options.description = options.description || '';
    options.color = options.color || 'primary-500';
    options.imageClasses = options.imageClasses || '';
    options.imageUrl = options.imageUrl || '';
    options.mode = options.mode || 'wide';

    const width = options.mode === 'wide' ? 1280 : 640;
    const height = 640;

    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width, height },
    });
    const page = await browser.newPage();

    await page.setContent(`<!DOCTYPE html>
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
        <div
          class="
            relative
            w-[${width}px]
            h-[${height}px]
            bg-white
            overflow-hidden
            ${
              options.mode === 'square'
                ? `border-[16px] border-${options.color}`
                : ''
            }
          "
        >
          ${
            options.mode === 'wide'
              ? `
          <div
            class="
              absolute
              top-[-400px]
              left-[-350px]
              rounded-full
              bg-${options.color}/30
              w-[500px]
              h-[980px]
            "
          ></div>
          <div
            class="
              absolute
              top-[-400px]
              right-[-350px]
              rounded-full
              bg-${options.color}/30
              w-[500px]
              h-[980px]
            "
          ></div>
          <div
            class="
              absolute
              top-[-400px]
              left-[-350px]
              rounded-full
              bg-${options.color}/60
              w-[500px]
              h-[915px]
            "
          ></div>
          <div
            class="
              absolute
              top-[-400px]
              right-[-350px]
              rounded-full
              bg-${options.color}/60
              w-[500px]
              h-[915px]
            "
          ></div>
          <div
            class="
              absolute
              top-[-400px]
              left-[-350px]
              rounded-full
              bg-${options.color}
              w-[500px]
              h-[850px]
            "
          ></div>
          <div
            class="
              absolute
              top-[-400px]
              right-[-350px]
              rounded-full
              bg-${options.color}
              w-[500px]
              h-[850px]
            "
          ></div>
          `
              : ''
          }

          <div class="pt-12 max-w-[${width - 50}px] mx-auto">
            <div class="absolute inset-x-0 bottom-10 text-gray-700">
              <div class="flex items-center justify-center space-x-2 space-x-reverse">
                <svg class="w-8 h-8 fill-current text-${
                  options.color
                }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2000 1920.79"><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><path d="M1000,0C447.72,0,0,447.72,0,1000c0,413.65,251.16,768.63,609.29,920.79L826.9,1353c-130.55-64-220.44-198.26-220.44-353.49,0-217.34,176.2-393.54,393.54-393.54s393.54,176.2,393.54,393.54c0,154.76-89.35,288.63-219.26,352.91l217.17,568.1C1749.19,1768.14,2000,1413.36,2000,1000,2000,447.72,1552.28,0,1000,0Z"/></g></g></svg>
                <div class="text-xl font-extrabold">متن‌باز</div>
              </div>
            </div>
            <div class="relative w-full h-full space-y-16">
              <div class="mx-auto flex items-center justify-center">
                <img
                  src="${options.imageUrl}"
                  class="h-64 ${options.imageClasses}"
                />
              </div>
    
              <div class="">
                <h1 class="${
                  options.mode === 'wide' ? 'text-5xl' : 'text-4xl'
                } font-extrabold text-center leading-tight">
                  ${options.title}
                </h1>
                <h3
                  class="
                    text-center
                    max-w-3xl
                    mx-auto
                    font-medium
                    text-gray-700
                    mt-4
                    ${options.mode === 'wide' ? 'text-3xl' : 'text-2xl'}
                  "
                >
                ${options.description}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
    `);

    const screenshot = await page.screenshot({
      omitBackground: true,
      type: 'jpeg',
    });
    await browser.close();

    return screenshot;
  }
}
