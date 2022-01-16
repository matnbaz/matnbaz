import { TelegrafModule } from '@matnbaz/telegraf';
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Webhook } from 'discord-webhook-node';
import {
  MonomediaModuleAsyncOptions,
  MonomediaModuleOptions,
  MonomediaOptionsFactory,
} from './interfaces';
import { DISCORD, MONOMEDIA_OPTIONS } from './monomedia.constants';
import { MonomediaService } from './monomedia.service';

@Module({
  controllers: [],
  providers: [MonomediaService],
  exports: [MonomediaService],
})
export class MonomediaModule {
  public static forRoot(options: MonomediaModuleOptions): DynamicModule {
    const DiscordProvider: Provider = {
      provide: DISCORD,
      useValue: this.instantiateDiscord(options),
    };

    const MonoMediaOptionsProvider: Provider = {
      provide: MONOMEDIA_OPTIONS,
      useValue: options,
    };

    const module: DynamicModule = {
      imports: [
        TelegrafModule.forRoot({ botToken: options.telegram?.botToken }),
      ],
      global: options.isGlobal || false,
      module: MonomediaModule,
      providers: [DiscordProvider, MonoMediaOptionsProvider],
      exports: [DiscordProvider],
    };

    return module;
  }

  public static forRootAsync(
    options: MonomediaModuleAsyncOptions
  ): DynamicModule {
    const DiscordProvider: Provider = {
      useFactory: (options: MonomediaModuleOptions) =>
        this.instantiateDiscord(options),
      provide: DISCORD,
      inject: [MONOMEDIA_OPTIONS],
    };
    return {
      global: options.isGlobal,
      imports: options.imports || [],
      module: MonomediaModule,
      providers: [...this.createAsyncProviders(options), DiscordProvider],
      exports: [DiscordProvider],
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
    const webhook = new Webhook(discord.webhookUrl);

    if (discord.botImage) webhook.setAvatar(discord.botImage);
    if (discord.botName) webhook.setUsername(discord.botName);

    return webhook;
  }
}
