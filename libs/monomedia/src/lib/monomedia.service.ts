import { TELEGRAF } from '@matnbaz/telegraf';
import { Inject, Injectable } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { MonomediaModuleOptions } from './interfaces';
import { MONOMEDIA_OPTIONS } from './monomedia.constants';

@Injectable()
export class MonomediaService {
  constructor(
    @Inject(MONOMEDIA_OPTIONS) private readonly options: MonomediaModuleOptions,
    @Inject(TELEGRAF) private readonly telegraf: Telegraf
  ) {}

  async send(
    caption: string,
    options: {
      telegram: boolean;
      discord: boolean;
      twitter: boolean;
    }
  ) {
    if (options.telegram) {
      await this.telegraf.telegram.sendMessage(
        this.options.telegram.channelUsername,
        caption
      );
    }

    if (options.discord) {
      // TODO: implement discord
    }

    if (options.twitter) {
      // TODO: implement twitter
    }
  }

  async sendPhoto(
    photo: string,
    caption: string,
    options: {
      telegram: boolean;
      instagram: boolean;
      discord: boolean;
      twitter: boolean;
    }
  ) {
    if (options.telegram) {
      await this.telegraf.telegram.sendPhoto(
        this.options.telegram.channelUsername,
        photo,
        { caption }
      );
    }

    if (options.instagram) {
      // TODO: implement instagram
    }

    if (options.discord) {
      // TODO: implement discord
    }

    if (options.twitter) {
      // TODO: implement twitter
    }
  }
}
