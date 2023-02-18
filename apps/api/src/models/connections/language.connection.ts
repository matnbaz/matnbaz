import { Paginated } from '../../utils/pagination';
import { ObjectType } from '@nestjs/graphql';
import { Language } from '../language.model';

@ObjectType()
export class LanguageConnection extends Paginated(Language) {}
