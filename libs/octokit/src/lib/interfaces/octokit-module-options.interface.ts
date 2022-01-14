import { ModuleMetadata, Type } from '@nestjs/common';
import { Octokit } from 'octokit';

export interface OctokitModuleOptions {
  isGlobal?: boolean;
  octokitOptions?: ConstructorParameters<typeof Octokit>[0];
  plugins?: Parameters<typeof Octokit['plugin']>;
}

export type AsyncOctokitModuleOptions = Omit<OctokitModuleOptions, 'isGlobal'>;

export interface OctokitOptionsFactory {
  createOctokitOptions():
    | Promise<AsyncOctokitModuleOptions>
    | AsyncOctokitModuleOptions;
}

export interface OctokitModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  isGlobal?: boolean;
  useExisting?: Type<OctokitOptionsFactory>;
  useClass?: Type<OctokitOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<AsyncOctokitModuleOptions> | AsyncOctokitModuleOptions;
  inject?: any[];
}
