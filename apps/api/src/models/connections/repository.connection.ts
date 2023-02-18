import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Repository } from '../repository.model';

@ObjectType()
export class RepositoryConnection extends Paginated(Repository) {}
