import { Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';

@Injectable()
export class OctokitService extends Octokit {
  constructor() {
    super({ auth: process.env.GITHUB_TOKEN });
  }
}
