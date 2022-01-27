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

  public telegram = {
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

  public instagram = {
    sendPhoto: async (photo: string, caption: string) => {
      await this.instagramSdk.login();
      await this.instagramSdk.uploadPhoto({
        photo,
        caption,
        post: 'feed',
      });
    },
  };

  public discord = {
    sendMessage: (message: string) => this.discordWebhook.send(message),
    sendPhoto: (
      photo: string,
      caption: string,
      extra?: {
        text?: string;
        color?: number;
        footer?: string;
        url?: string;
        author?: {
          name?: string;
          image?: string;
          url?: string;
        };
      }
    ) =>
      this.discordWebhook.send(
        (new MessageBuilder() as any) // Have to do this because of this issue: https://github.com/matthew1232/discord-webhook-node/pull/39
          .setImage(photo)
          .setTitle(caption)
          .setText(extra?.text)
          .setURL(extra?.url)
          .setColor(extra?.color)
          .setFooter(extra?.footer)
          .setAuthor(
            extra?.author?.name,
            extra.author?.image,
            extra.author?.url
          )
      ),
  };

  public twitter = {
    sendMessage: (message: string) => this.twitterSdk.postTweet(message),
  };
}
