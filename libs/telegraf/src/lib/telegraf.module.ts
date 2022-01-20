import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import {
  TelegrafModuleAsyncOptions,
  TelegrafModuleOptions,
  TelegrafOptionsFactory,
} from './interfaces';
import { TELEGRAF, TELEGRAF_OPTIONS } from './telegraf.constants';

@Module({})
export class TelegrafModule {
  public static forRoot(options: TelegrafModuleOptions): DynamicModule {
    const TelegrafProvider: Provider = {
      provide: TELEGRAF,
      useValue: this.instantiateTelegraf(options),
    };
    return {
      global: options.isGlobal || false,
      module: TelegrafModule,
      providers: [TelegrafProvider],
      exports: [TelegrafProvider],
    };
  }

  public static forRootAsync(
    options: TelegrafModuleAsyncOptions
  ): DynamicModule {
    const TelegrafProvider: Provider = {
      useFactory: (options: TelegrafModuleOptions) =>
        this.instantiateTelegraf(options),
      provide: TELEGRAF,
      inject: [TELEGRAF_OPTIONS],
    };
    return {
      global: options.isGlobal,
      imports: options.imports || [],
      module: TelegrafModule,
      providers: [...this.createAsyncProviders(options), TelegrafProvider],
      exports: [TelegrafProvider],
    };
  }

  private static createAsyncProviders(
    optionsAsync: TelegrafModuleAsyncOptions
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
    options: TelegrafModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: TELEGRAF_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    const provider: Provider = {
      provide: TELEGRAF_OPTIONS,
      useFactory: async (optionsFactory: TelegrafOptionsFactory) =>
        await optionsFactory.createTelegrafOptions(),
    };
    if (options.useExisting) provider.inject = [options.useExisting];
    if (options.useClass) provider.inject = [options.useClass];
    return provider;
  }

  private static instantiateTelegraf(options: TelegrafModuleOptions): Telegraf {
    return new Telegraf(options.botToken);
  }
}
