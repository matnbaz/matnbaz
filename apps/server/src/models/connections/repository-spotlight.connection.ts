import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { RepositorySpotlight } from '../repository-spotlight.model';

@ObjectType()
export class RepositorySpotlightConnection extends Paginated(
  RepositorySpotlight
) {}
