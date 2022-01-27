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

export interface MonomediaSocialMedia {
  sendMessage?: (message: string) => Promise<any>;
  sendPhoto?: (photo: string, caption?: string) => Promise<any>;
}

@Injectable()
export class MonomediaService {
  constructor(
    @Inject(MONOMEDIA_OPTIONS) private readonly options: MonomediaModuleOptions,
    @Inject(TELEGRAF) private readonly telegraf: Telegraf,
    @Inject(DISCORD_WEBHOOK) private readonly discordWebhook: DiscordWebhook,
    private readonly twitterSdk: TwitterPuppeteer,
    @Inject(INSTAGRAM) private readonly instagramSdk
  ) {}

  public telegram: MonomediaSocialMedia = {
    sendMessage: (message: string) =>
      this.telegraf.telegram.sendMessage(
        normalizeTelegramUsername(this.options.telegram.channelUsername),
        message,
        { parse_mode: 'Markdown' }
      ),

    sendPhoto: (photo: string, caption: string) =>
      this.telegraf.telegram.sendPhoto(
        normalizeTelegramUsername(this.options.telegram.channelUsername),
        photo,
        {
          caption,
          parse_mode: 'Markdown',
        }
      ),
  };

  public instagram: MonomediaSocialMedia = {
    sendPhoto: async (photo: string, caption: string) => {
      await this.instagramSdk.login();
      await this.instagramSdk.uploadPhoto({
        photo,
        caption,
        post: 'feed',
      });
    },
  };

  public discord: MonomediaSocialMedia = {
    sendMessage: (message: string) => this.discordWebhook.send(message),
    sendPhoto: (photo: string, caption: string) =>
      this.discordWebhook.send(
        new MessageBuilder().setImage(photo).setText(caption)
      ),
  };

  public twitter: MonomediaSocialMedia = {
    sendMessage: (message: string) => this.twitterSdk.postTweet(message),
  };
}
