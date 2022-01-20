import { Owner, Repository, RepositorySelection } from '@prisma/client';

export type SelectionWithRepoAndOwner = RepositorySelection & {
  Repositories: (Repository & {
    Owner: Owner;
  })[];
};
