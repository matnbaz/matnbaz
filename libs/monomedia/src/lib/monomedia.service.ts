import { TELEGRAF } from '@matnbaz/telegraf';
import { Inject, Injectable } from '@nestjs/common';
import {
  MessageBuilder,
  Webhook as DiscordWebhook,
} from 'discord-webhook-node';
import { Telegraf } from 'telegraf';
import { MonomediaModuleOptions } from './interfaces';
import { DISCORD, MONOMEDIA_OPTIONS } from './monomedia.constants';
import { normalizeTelegramUsername } from './utils';

@Injectable()
export class MonomediaService {
  constructor(
    @Inject(MONOMEDIA_OPTIONS) private readonly options: MonomediaModuleOptions,
    @Inject(TELEGRAF) private readonly telegraf: Telegraf,
    @Inject(DISCORD) private readonly discordWebhook: DiscordWebhook
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
      this.discordWebhook.send(message);
    }

    if (options.twitter) {
      // TODO: implement twitter
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
      // TODO: implement instagram
    }

    if (options.discord) {
      this.discordWebhook.send(
        new MessageBuilder().setImage(photo).setText(caption)
      );
    }

    if (options.twitter) {
      // TODO: implement twitter
    }
  }
}
