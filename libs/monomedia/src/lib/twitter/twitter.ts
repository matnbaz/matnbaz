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
      headless: false,
      userDataDir: './chromium',
      args: [
        '--disable-dev-shm-usage',
        '--shm-size=1gb', // --shm-size=1gb to fix Protocol error (Runtime.callFunctionOn)
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });

    const page = await browser.newPage();
    // open twitter
    await page.goto('https://twitter.com/login', {
      timeout: 0,
      waitUntil: 'domcontentloaded',
    });

    //Login
    // wait for page dom content to load
    await page
      .waitForNavigation({ waitUntil: 'domcontentloaded' })
      .catch((e) => {
        console.log('Error: ' + e);
      });

    // await page
    //   .waitForSelector(".js-username-field.email-input.js-initial-focus")
    //   .then(() => console.log("got Username Field"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });

    // await page
    //   .waitForSelector(
    //     ".submit.EdgeButton.EdgeButton--primary.EdgeButtom--medium"
    //   )
    //   .then(() => console.log("got login button"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });

    await page
      .waitForTimeout(2000)
      .then(() => console.log('waited for 2000'))
      .catch((e) => {
        console.log('Error: ' + e);
      });

    // await page
    //   .click(".js-username-field.email-input.js-initial-focus")
    //   .then(() => console.log("clicked it username_or_email"))
    //   .catch(e => {
    //     console.log("Error: " + e);
    //   });
    //page.$('select[name="busca_grupo_estado"]');

    if (page.url() !== 'https://twitter.com/home') {
      await page
        .waitForSelector('[autocomplete="username"]')
        .then(() => console.log('got Username Field'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      await page
        .click('[autocomplete="username"]')
        .then(() => console.log('clicked username input'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      await page.keyboard
        .type(this.options.twitter.username)
        .then(() => console.log('typed username'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      const nextButtons = await page.$x("//span[contains(text(), 'Next')]");

      if (nextButtons.length === 0) {
        return console.log("Error: Didn't find any next button");
      }

      await nextButtons[0]
        .click()
        .then(() => console.log('Clicked on next button'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      await page.waitForTimeout(2000).catch((e) => {
        console.log('Error: ' + e);
      });
      // await page
      //   .click(".js-password-field")
      //   .then(() => console.log("clicked it session[password]"))
      //   .catch(e => {
      //     console.log("Error: " + e);
      //   });
      //session[password]

      await page
        .click('[autocomplete="current-password"]')
        .then(() => console.log('clicked Password input'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      await page.keyboard.type(this.options.twitter.password).catch((e) => {
        console.log('Error: ' + e);
      });

      let loginButtons = await page.$x("//span[contains(text(), 'Login')]");

      if (loginButtons.length === 0) {
        loginButtons = await page.$x("//span[contains(text(), 'Log in')]");
      }

      if (loginButtons.length === 0) {
        return console.log("Error: Didn't find any login button");
      }

      await loginButtons[0]
        .click()
        .then(() => console.log('Clicked on login button'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      //data-testid="LoginForm_Login_Button"
      await page
        .click('[data-testid="LoginForm_Login_Button"')
        .then(() => console.log('Clicked LoginForm_Login_Button'))
        .catch((e) => {
          console.log('Error: ' + e);
        });

      // wait till page load
      await page
        .waitForNavigation({ waitUntil: 'domcontentloaded' })
        .then(() => {
          console.log('Waited for page navigation');
        })
        .catch((e) => {
          console.log('Error: ' + e);
        });
    }

    await page
      .waitForTimeout(3000)
      .then(() => {
        console.log('Waited for 3000');
      })
      .catch((e) => {
        console.log('Error: ' + e);
      });

    await page
      .waitForSelector('[data-testid="SideNav_NewTweet_Button"]')
      .then(() => console.log('got it'))
      .catch((e) => {
        console.log('Error: ' + e);
      });

    //same thing
    //await page.click('.css-1dbjc4n.r-1awozwy.r-jw8lkh.r-e7q0ms')
    await page.click('[data-testid="SideNav_NewTweet_Button"]').catch((e) => {
      console.log('Error: ' + e);
    });

    // Typing Tweet
    await page
      .waitForSelector('[data-testid="tweetTextarea_0"]')
      .then(() => console.log('got it tweetTextarea_0'))
      .catch((e) => {
        console.log('Error: ' + e);
      });
    await page
      .click('[data-testid="tweetTextarea_0"]')
      .then(() => console.log('clicked it tweetTextarea_0'))
      .catch((e) => {
        console.log('Error: ' + e);
      });
    await page.keyboard.type(message).catch((e) => {
      console.log('Error: ' + e);
    });
    await page.waitForTimeout(2000).catch((e) => {
      console.log('Error: ' + e);
    });

    //Clicking Tweet Button to post Tweet
    await page
      .waitForSelector('[data-testid="tweetButton"]')
      .then(() => console.log('got it tweetButton'))
      .catch((e) => {
        console.log('Error: ' + e);
      });
    await page
      .click('[data-testid="tweetButton"]')
      .then(() => console.log('clicked it tweetButton'))
      .catch((e) => {
        console.log('Error: ' + e);
      });
    await page.waitForTimeout(2000).catch((e) => {
      console.log('Error: ' + e);
    });

    // Closing browser
    await browser.close().catch((e) => {
      console.log('Error: ' + e);
    });
  }
}
