import { Test } from '@nestjs/testing';
import { Octokit } from 'octokit';
import { OCTOKIT } from './octokit.constants';
import { OctokitService } from './octokit.service';

describe('OctokitService', () => {
  let service: OctokitService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        OctokitService,
        {
          provide: OCTOKIT,
          useValue: new Octokit(),
        },
      ],
    }).compile();

    service = module.get(OctokitService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  it('should be able to interact with the Octokit instance', async () => {
    const response = await service.rest.search.repos({
      q: 'nestjs',
      per_page: 1,
    });

    expect(response.data).toBeDefined();
  });
});
