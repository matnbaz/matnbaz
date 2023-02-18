import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Collect } from '../collect.model';

@ObjectType()
export class CollectConnection extends Paginated(Collect) {}
