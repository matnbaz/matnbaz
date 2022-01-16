import { ModuleMetadata, Type } from '@nestjs/common';
import { Telegraf } from 'telegraf';

export interface TelegrafModuleOptions {
  isGlobal?: boolean;
  botToken?: ConstructorParameters<typeof Telegraf>[0];
}

export type AsyncTelegrafModuleOptions = Omit<
  TelegrafModuleOptions,
  'isGlobal'
>;

export interface TelegrafOptionsFactory {
  createTelegrafOptions():
    | Promise<AsyncTelegrafModuleOptions>
    | AsyncTelegrafModuleOptions;
}

export interface TelegrafModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<TelegrafOptionsFactory>;
  useClass?: Type<TelegrafOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AsyncTelegrafModuleOptions> | AsyncTelegrafModuleOptions;
  inject?: any[];
}
