import { Inject, Injectable } from '@nestjs/common';
import { Octokit } from 'octokit';
import { OCTOKIT } from './octokit.constants';

@Injectable()
export class OctokitService implements Octokit {
  constructor(@Inject(OCTOKIT) private readonly octokit: Octokit) {}
  request: Octokit['request'] = this.octokit.request;
  graphql: Octokit['graphql'] = this.octokit.graphql;
  log: Octokit['log'] = this.octokit.log;
  hook: Octokit['hook'] = this.octokit.hook;
  auth: Octokit['auth'] = this.octokit.auth;
  paginate: Octokit['paginate'] = this.octokit.paginate;
  rest: Octokit['rest'] = this.octokit.rest;
  retry: Octokit['retry'] = this.octokit.retry;
}
