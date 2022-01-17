import { Inject, Injectable } from '@nestjs/common';
import {
  MessageBuilder,
  Webhook as DiscordWebhook,
} from 'discord-webhook-node';
import { Telegraf } from 'telegraf';
import { MonomediaModuleOptions } from './interfaces';
import {
  DISCORD_WEBHOOK,
  INSTAGRAM,
  MONOMEDIA_OPTIONS,
  TELEGRAF,
} from './monomedia.constants';
import { TwitterPuppeteer } from './twitter/twitter';
import { normalizeTelegramUsername } from './utils';

@Injectable()
export class MonomediaService {
  constructor(
    @Inject(MONOMEDIA_OPTIONS) private readonly options: MonomediaModuleOptions,
    @Inject(TELEGRAF) private readonly telegraf: Telegraf,
    @Inject(DISCORD_WEBHOOK) private readonly discordWebhook: DiscordWebhook,
    private readonly twitterSdk: TwitterPuppeteer,
    @Inject(INSTAGRAM) private readonly instagramSdk
  ) {}

  async sendMessage(
    message: string,
    options: {
      telegram?: boolean;
      discord?: boolean;
      twitter?: boolean;
    }
  ) {
    if (options.telegram) {
      await this.telegraf.telegram.sendMessage(
        normalizeTelegramUsername(this.options.telegram.channelUsername),
        message
      );
    }

    if (options.discord) {
      await this.discordWebhook.send(message);
    }

    if (options.twitter) {
      await this.twitterSdk.postTweet(message);
    }
  }

  async sendPhoto(
    photo: string,
    caption: string,
    options: {
      telegram?: boolean;
      instagram?: boolean;
      discord?: boolean;
      twitter?: boolean;
    }
  ) {
    if (options.telegram) {
      await this.telegraf.telegram.sendPhoto(
        normalizeTelegramUsername(this.options.telegram.channelUsername),
        photo,
        {
          caption,
        }
      );
    }

    if (options.instagram) {
      await this.instagramSdk.login();
      await this.instagramSdk.uploadPhoto({
        photo,
        caption,
        post: 'feed',
      });
    }

    if (options.discord) {
      await this.discordWebhook.send(
        new MessageBuilder().setImage(photo).setText(caption)
      );
    }

    if (options.twitter) {
      // TODO: implement twitter
    }
  }
}
