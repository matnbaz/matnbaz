import { TelegrafModuleOptions } from '@matnbaz/telegraf';
import { ModuleMetadata, Type } from '@nestjs/common';

export interface MonomediaModuleOptions {
  isGlobal?: boolean;
  telegram: TelegrafModuleOptions & { channelUsername: string };
  instagram: any;
  discord: any;
  twitter: any;
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
