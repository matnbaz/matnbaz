import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Language } from './language.model';

@ObjectType()
export class OwnerLanguage {
  @Field(() => Int)
  size: number;

  /**
   * As `OwnerLanguage` is always retrieved in a context of an owner, the percentage is relative to other used languages from the same owner.
   */
  @Field(() => Int)
  percentage: number;

  @Field(() => Language)
  language: Language;
}
