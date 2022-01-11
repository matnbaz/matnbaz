import { Injectable } from '@nestjs/common';
import { throttling } from '@octokit/plugin-throttling';
import { Octokit } from 'octokit';

const MyOctokit = Octokit.plugin(throttling);

@Injectable()
export class OctokitService extends MyOctokit {
  constructor() {
    super({
      auth: process.env.GITHUB_TOKEN,
      throttle: {
        onRateLimit: (retryAfter, options, octokit) => {
          octokit.log.warn(
            `Request quota exhausted for request ${options.method} ${options.url}`
          );

          octokit.log.info(`Retrying after ${retryAfter} seconds!`);
          return true;
        },
        onAbuseLimit: (retryAfter, options, octokit) => {
          // does not retry, only logs a warning
          octokit.log.warn(
            `Abuse detected for request ${options.method} ${options.url}`
          );
        },
      },
    });
  }
}
