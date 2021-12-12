import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Repository } from '../repository.model';

@ObjectType()
export class RepositoryConnection extends Paginated(Repository) {}
