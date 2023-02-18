import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Post } from '../post.model';

@ObjectType()
export class PostConnection extends Paginated(Post) {}
