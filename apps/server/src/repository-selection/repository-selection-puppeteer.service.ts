import { persianNumbers } from '@matnbaz/common';
import { Injectable } from '@nestjs/common';
import { format } from 'date-fns-jalali';
import * as puppeteer from 'puppeteer';
import { SelectionWithRepoAndOwner } from './repository-selection.types';

@Injectable()
export class RepositorySelectionPuppeteerService {
  async generateRepositorySelectionThumbnail(
    {
      description,
      selectionedAt,
      id,
      Repositories: repos,
    }: SelectionWithRepoAndOwner,
    square?: boolean
  ) {
    const width = square ? 960 : 1280;
    const height = square ? 960 : 640;
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      defaultViewport: { width, height },
    });
    const page = await browser.newPage();

    await page.setContent(`
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
    <div class="relative p-24 w-[${width}px] h-[${height}px] bg-white overflow-hidden">
    ${
      square
        ? `
        <div class="absolute top-[-285px] left-[-350px] rounded-full bg-gradient-to-b from-indigo-300 via-indigo-300 to-primary-300 w-[500px] h-[850px]"></div>
        <div class="absolute top-[-285px] right-[-350px] rounded-full bg-gradient-to-b from-indigo-300 via-indigo-300 to-primary-300 w-[500px] h-[850px]"></div>
        <div class="absolute top-[-350px] left-[-350px] rounded-full bg-gradient-to-b from-indigo-400 via-indigo-400 to-primary-400 w-[500px] h-[850px]"></div>
        <div class="absolute top-[-350px] right-[-350px] rounded-full bg-gradient-to-b from-indigo-400 via-indigo-400 to-primary-400 w-[500px] h-[850px]"></div>
        <div class="absolute top-[-400px] left-[-350px] rounded-full bg-gradient-to-b from-indigo-500 via-indigo-500 to-primary-500 w-[500px] h-[850px]"></div>
        <div class="absolute top-[-400px] right-[-350px] rounded-full bg-gradient-to-b from-indigo-500 via-indigo-500 to-primary-500 w-[500px] h-[850px]"></div>
    `
        : `
        <div class="absolute bottom-[-350px] right-[-280px] rounded-full bg-gradient-to-l from-indigo-300 via-indigo-300 to-primary-300 w-[1000px] h-[500px]"></div>
        <div class="absolute top-[-350px] right-[-280px] rounded-full bg-gradient-to-l from-indigo-300 via-indigo-300 to-primary-300 w-[1000px] h-[500px]"></div>
        <div class="absolute bottom-[-350px] right-[-350px] rounded-full bg-gradient-to-l from-indigo-400 via-indigo-400 to-primary-400 w-[1000px] h-[500px]"></div>
        <div class="absolute top-[-350px] right-[-350px] rounded-full bg-gradient-to-l from-indigo-400 via-indigo-400 to-primary-400 w-[1000px] h-[500px]"></div>
        <div class="absolute bottom-[-350px] right-[-400px] rounded-full bg-gradient-to-l from-indigo-500 via-indigo-500 to-primary-500 w-[1000px] h-[500px]"></div>
        <div class="absolute top-[-350px] right-[-400px] rounded-full bg-gradient-to-l from-indigo-500 via-indigo-500 to-primary-500 w-[1000px] h-[500px]"></div>
      `
    }

    ${
      square
        ? `<div class="opacity-75 absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-3" dir="ltr">
      <img src="https://raw.githubusercontent.com/matnbaz/visual-identity/main/full-logo.png" class="h-6 brightness-0" />
      <div class="text-xl">|</div>
      <div class="font-medium">matnbaz.net</div>
    </div>`
        : ``
    }
      
      <!-- <p class="absolute left-6 bottom-4 text-gray-700">matnbaz.net/s/${id}</p> -->
      <div class="relative grid gap-5 ${
        square ? '' : 'grid-cols-2 content-center'
      } overflow-hidden  h-full">
        <div class="${square ? 'text-center' : 'text-right self-center'}">
          <div class="flex items-center space-x-4 space-x-reverse ${
            square ? 'justify-center' : ''
          }">
            <!-- <div class="bg-primary-500 w-14 h-14 rounded-full flex-shrink-0"></div> -->
            <h1 class="text-7xl font-extrabold">پروژه${
              repos.length > 1 ? '‌های' : ''
            } منتخب</h1>
          </div>
          <h3 class="mt-6 text-4xl font-medium text-gray-700 leading-relaxed">
            ${persianNumbers(format(selectionedAt, 'EEEE y/M/d'))}
          </h3>
        </div>
        <div class="self-center place-self-center ${
          square ? 'mx-auto' : 'mr-auto'
        }">
            <div class="grid gap-4 ${repos.length > 6 ? 'grid-cols-2' : ''} ${
      square ? 'max-h-[50vh]' : ''
    }">
            ${repos
              .map(
                ({ Owner, name }) => `
            <div class="flex items-center justify-start space-x-[${
              repos.length < 3 ? '2rem' : '1rem'
            }]" dir="ltr">
            <img src="https://github.com/${Owner.login}.png" class="h-[${
                  repos.length === 1
                    ? 24
                    : Math.max((square ? 40 : 50) / repos.length, 6)
                }vh] ${
                  Owner.type === 'Organization' ? 'rounded-lg' : 'rounded-full'
                } break-words" />
            <div>
              <h4 class="text-[${
                repos.length === 1 ? 50 : Math.max(90 / repos.length, 16)
              }px] font-bold">${name}</h4>
              <h5 class="text-[${
                repos.length === 1 ? 32 : Math.max(52 / repos.length, 10)
              }px] text-gray-600">${Owner.login}</h5>
            </div>
            </div>`
              )
              .join('')}
            </div>
        </div>
      </div>
    </div>
  </body>
</html>
`);
    const screenshot = await page.screenshot({ omitBackground: true });
    await browser.close();
    return screenshot;
  }
}
