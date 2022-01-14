import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Octokit } from 'octokit';
import {
  OctokitModuleAsyncOptions,
  OctokitModuleOptions,
  OctokitOptionsFactory,
} from './interfaces/octokit-module-options.interface';
import { OCTOKIT, OCTOKIT_OPTIONS } from './octokit.constants';
import { OctokitService } from './octokit.service';

@Module({
  providers: [OctokitService],
  exports: [OctokitService],
})
export class OctokitModule {
  public static forRoot(options: OctokitModuleOptions): DynamicModule {
    return {
      global: options.isGlobal || false,
      module: OctokitModule,
      providers: [
        {
          provide: OCTOKIT,
          useValue: this.instantiateOctokit(options),
        },
      ],
    };
  }

  public static forRootAsync(
    options: OctokitModuleAsyncOptions
  ): DynamicModule {
    const OctokitProvider: Provider = {
      useFactory: (options: OctokitModuleOptions) =>
        this.instantiateOctokit(options),
      provide: OCTOKIT,
      inject: [OCTOKIT_OPTIONS],
    };
    return {
      global: options.isGlobal,
      imports: options.imports || [],
      module: OctokitModule,
      providers: [...this.createAsyncProviders(options), OctokitProvider],
    };
  }

  private static createAsyncProviders(
    optionsAsync: OctokitModuleAsyncOptions
  ): Provider[] {
    if (optionsAsync.useExisting || optionsAsync.useFactory) {
      return [this.createAsyncOptionsProvider(optionsAsync)];
    }
    return [
      this.createAsyncOptionsProvider(optionsAsync),
      {
        provide: optionsAsync.useClass,
        useClass: optionsAsync.useClass,
      },
    ];
  }
  private static createAsyncOptionsProvider(
    options: OctokitModuleAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: OCTOKIT_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: OCTOKIT_OPTIONS,
      useFactory: async (optionsFactory: OctokitOptionsFactory) =>
        await optionsFactory.createOctokitOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  private static instantiateOctokit(options: OctokitModuleOptions): Octokit {
    let MyOctokit = Octokit;

    if (options.plugins) {
      MyOctokit = MyOctokit.plugin(...options.plugins);
      console.log('plugins applied');
    }

    return new MyOctokit(options.octokitOptions);
  }
}
