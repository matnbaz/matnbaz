import { Paginated } from '@exonest/graphql-connections';
import { ObjectType } from '@nestjs/graphql';
import { Language } from '../language.model';

@ObjectType()
export class LanguageConnection extends Paginated(Language) {}
