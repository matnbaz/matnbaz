import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Webhook } from 'discord-webhook-node';
import * as Instagram from 'instagram-web-api';
import { Telegraf } from 'telegraf';
import * as FileCookieStore from 'tough-cookie-filestore2';
import {
  MonomediaModuleAsyncOptions,
  MonomediaModuleOptions,
  MonomediaOptionsFactory,
} from './interfaces';
import {
  DISCORD_WEBHOOK,
  INSTAGRAM,
  MONOMEDIA_OPTIONS,
  TELEGRAF,
} from './monomedia.constants';
import { MonomediaService } from './monomedia.service';
import { TwitterPuppeteer } from './twitter/twitter';

@Module({
  controllers: [],
  providers: [MonomediaService, TwitterPuppeteer],
  exports: [MonomediaService],
})
export class MonomediaModule {
  public static forRoot(options: MonomediaModuleOptions): DynamicModule {
    const DiscordProvider: Provider = {
      provide: DISCORD_WEBHOOK,
      useValue: this.instantiateDiscord(options),
    };

    const TelegrafProvider: Provider = {
      provide: TELEGRAF,
      useValue: this.instantiateTelegraf(options),
    };

    const InstagramProvider: Provider = {
      provide: INSTAGRAM,
      useValue: this.instantiateInstagram(options),
    };

    const MonoMediaOptionsProvider: Provider = {
      provide: MONOMEDIA_OPTIONS,
      useValue: options,
    };

    const module: DynamicModule = {
      global: options.isGlobal || false,
      module: MonomediaModule,
      providers: [
        DiscordProvider,
        TelegrafProvider,
        InstagramProvider,
        MonoMediaOptionsProvider,
      ],
    };

    return module;
  }

  public static forRootAsync(
    options: MonomediaModuleAsyncOptions
  ): DynamicModule {
    const DiscordProvider: Provider = {
      useFactory: (options: MonomediaModuleOptions) =>
        this.instantiateDiscord(options),
      provide: DISCORD_WEBHOOK,
      inject: [MONOMEDIA_OPTIONS],
    };

    const TelegrafProvider: Provider = {
      useFactory: (options: MonomediaModuleOptions) =>
        this.instantiateTelegraf(options),
      provide: TELEGRAF,
      inject: [MONOMEDIA_OPTIONS],
    };

    const InstagramProvider: Provider = {
      useFactory: (options: MonomediaModuleOptions) =>
        this.instantiateInstagram(options),
      provide: INSTAGRAM,
      inject: [MONOMEDIA_OPTIONS],
    };

    return {
      global: options.isGlobal,
      imports: options.imports || [],
      module: MonomediaModule,
      providers: [
        ...this.createAsyncProviders(options),
        DiscordProvider,
        TelegrafProvider,
        InstagramProvider,
      ],
    };
  }

  private static createAsyncProviders(
    optionsAsync: MonomediaModuleAsyncOptions
  ): Provider[] {
    if (optionsAsync.useExisting || optionsAsync.useFactory) {
      return [this.createAsyncOptionsProvider(optionsAsync)];
    }
    if (optionsAsync.useClass) {
      return [
        this.createAsyncOptionsProvider(optionsAsync),
        {
          provide: optionsAsync.useClass,
          useClass: optionsAsync.useClass,
        },
      ];
    }
    throw Error(
      'One of useClass, useFactory or useExisting should be provided'
    );
  }
  private static createAsyncOptionsProvider(
    options: MonomediaModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: MONOMEDIA_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const provider: Provider = {
      provide: MONOMEDIA_OPTIONS,
      useFactory: async (optionsFactory: MonomediaOptionsFactory) =>
        await optionsFactory.createMonomediaOptions(),
    };
    if (options.useExisting) provider.inject = [options.useExisting];
    if (options.useClass) provider.inject = [options.useClass];
    return provider;
  }

  private static instantiateDiscord({
    discord,
  }: MonomediaModuleOptions): Webhook {
    const webhook = new Webhook(discord.webhookUrl || '');

    if (discord.botImage) webhook.setAvatar(discord.botImage);
    if (discord.botName) webhook.setUsername(discord.botName);

    return webhook;
  }

  private static instantiateTelegraf({
    telegram,
  }: MonomediaModuleOptions): Telegraf {
    return new Telegraf(telegram?.botToken);
  }

  private static instantiateInstagram({
    instagram,
  }: MonomediaModuleOptions): Instagram {
    return new Instagram({
      username: instagram?.username,
      password: instagram?.password,
      cookieStore: new FileCookieStore('./storage/instagram/cookies.json'),
    });
  }
}
