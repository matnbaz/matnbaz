import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Topic } from '../topic.model';

@ObjectType()
export class TopicConnection extends Paginated(Topic) {}
