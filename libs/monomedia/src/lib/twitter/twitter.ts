import { Inject, Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { MonomediaModuleOptions } from '../interfaces';
import { MONOMEDIA_OPTIONS } from '../monomedia.constants';

@Injectable()
export class TwitterPuppeteer {
  constructor(
    @Inject(MONOMEDIA_OPTIONS) private readonly options: MonomediaModuleOptions
  ) {}

  async postTweet(message: string) {
    const browser = await puppeteer.launch({
      headless: true,
      userDataDir: './storage/chromium',
      args: [
        '--disable-dev-shm-usage',
        '--shm-size=1gb', // --shm-size=1gb to fix Protocol error (Runtime.callFunctionOn)
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });

    const page = await browser.newPage();
    await page.goto('https://twitter.com/login', {
      timeout: 0,
      waitUntil: 'domcontentloaded',
    });
    await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(2000);

    // If there's no active session, try logging in
    if (page.url() !== 'https://twitter.com/home') {
      await page.waitForSelector('[autocomplete="username"]');
      await page.click('[autocomplete="username"]');
      await page.keyboard.type(this.options.twitter.username);

      const nextButtons = await page.$x("//span[contains(text(), 'Next')]");

      if (nextButtons.length === 0)
        throw new Error("Didn't find any next button");

      await nextButtons[0].click();

      await page.waitForTimeout(2000);
      await page.click('[autocomplete="current-password"]');

      await page.keyboard.type(this.options.twitter.password);

      let loginButtons = await page.$x("//span[contains(text(), 'Login')]");

      if (loginButtons.length === 0)
        loginButtons = await page.$x("//span[contains(text(), 'Log in')]");

      if (loginButtons.length === 0)
        return console.log("Error: Didn't find any login button");

      await loginButtons[0].click();

      await page.click('[data-testid="LoginForm_Login_Button"');

      // wait till page load
      await page.waitForNavigation({ waitUntil: 'domcontentloaded' });
    }

    await page.waitForTimeout(3000);
    await page.waitForSelector('[data-testid="SideNav_NewTweet_Button"]');
    await page.click('[data-testid="SideNav_NewTweet_Button"]');

    // Type Tweet
    await page.waitForSelector('[data-testid="tweetTextarea_0"]');
    await page.click('[data-testid="tweetTextarea_0"]');
    await page.keyboard.type(message);
    await page.waitForTimeout(2000);

    // Post tweet
    await page.waitForSelector('[data-testid="tweetButton"]');
    await page.click('[data-testid="tweetButton"]');
    await page.waitForTimeout(2000);

    // Closing browser
    await browser.close();
  }
}
