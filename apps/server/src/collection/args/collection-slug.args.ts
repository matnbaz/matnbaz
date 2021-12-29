import { ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CollectionSlugArgs {
  slug: string;
}
