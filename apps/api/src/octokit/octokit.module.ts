import { Global, Module } from '@nestjs/common';
import { Octokit } from 'octokit';
import { throttling } from '@octokit/plugin-throttling';
import { OCTOKIT } from './octokit.constants';

@Global()
@Module({
  providers: [
    {
      provide: OCTOKIT,
      useFactory: () => {
        return new Octokit({
          plugins: [throttling],
        });
      },
    },
  ],
  exports: [OCTOKIT],
})
export class OctokitModule {}
