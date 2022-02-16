import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Language } from './language.model';

@ObjectType()
export class RepositoryLanguage {
  @Field(() => Int)
  size: number;

  /**
   * As `RepositoryLanguage` is always retrieved in a context of a repository, the percentage is relative to other languages from the same repository.
   */
  percentage: number;

  language: Language;
}
