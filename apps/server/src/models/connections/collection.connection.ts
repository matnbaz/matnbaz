import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Collection } from '../collection.model';

@ObjectType({ description: "Nice name, isn't it?" })
export class CollectionConnection extends Paginated(Collection) {}
