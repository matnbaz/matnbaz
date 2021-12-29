import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Collect } from '../collect.model';

@ObjectType()
export class CollectConnection extends Paginated(Collect) {}
