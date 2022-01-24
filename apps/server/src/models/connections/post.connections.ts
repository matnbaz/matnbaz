import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Post } from '../post.model';

@ObjectType()
export class PostConnection extends Paginated(Post) {}
