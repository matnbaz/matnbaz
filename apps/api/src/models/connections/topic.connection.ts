import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Topic } from '../topic.model';

@ObjectType()
export class TopicConnection extends Paginated(Topic) {}
