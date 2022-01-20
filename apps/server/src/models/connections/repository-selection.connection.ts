import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { RepositorySelection } from '../repository-selection.model';

@ObjectType()
export class RepositorySelectionConnection extends Paginated(
  RepositorySelection
) {}
