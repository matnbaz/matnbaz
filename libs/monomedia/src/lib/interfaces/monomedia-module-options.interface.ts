import { TelegrafModuleOptions } from '@matnbaz/telegraf';
import { ModuleMetadata, Type } from '@nestjs/common';
export interface MonomediaModuleOptions {
  isGlobal?: boolean;
  telegram?: { channelUsername: string } & TelegrafModuleOptions;
  discord?: { webhookUrl: string; botName?: string; botImage?: string };
  instagram?: any;
  twitter?: {
    username: string;
    password: string;
  };
}

export type AsyncMonomediaModuleOptions = Omit<
  MonomediaModuleOptions,
  'isGlobal'
>;

export interface MonomediaOptionsFactory {
  createMonomediaOptions():
    | Promise<AsyncMonomediaModuleOptions>
    | AsyncMonomediaModuleOptions;
}

export interface MonomediaModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<MonomediaOptionsFactory>;
  useClass?: Type<MonomediaOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AsyncMonomediaModuleOptions> | AsyncMonomediaModuleOptions;
  inject?: any[];
}
