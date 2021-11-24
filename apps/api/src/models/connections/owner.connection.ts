import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '@exonest/graphql-connections';
import { Owner } from '../owner.model';

@ObjectType()
export class OwnerConnection extends Paginated(Owner) {}
