import { Owner, Repository, RepositorySpotlight } from '@prisma/client';

export type SpotlightWithRepoAndOwner = RepositorySpotlight & {
  Repositories: (Repository & {
    Owner: Owner;
  })[];
};
