import { Field, ID, Int, InterfaceType, ObjectType } from '@nestjs/graphql';
import { OwnerType } from './enums/owner-type.enum';
import { PlatformType } from './enums/platform-type.enum';
import { Node } from './node.model';

@InterfaceType({
  implements: [Node],
  resolveType: (owner: Owner) => {
    switch (owner.type) {
      case OwnerType.Organization:
        return OwnerOrganization;
      case OwnerType.User:
        return OwnerUser;
    }
  },
})
export class Owner {
  @Field(() => ID)
  id: string;
  @Field(() => PlatformType)
  platform: PlatformType;
  @Field(() => ID)
  platformId: string;
  name?: string;
  about?: string;
  login: string;
  @Field(() => OwnerType)
  type: OwnerType;
  twitterUsername?: string;
  location?: string;
  websiteUrl?: string;
  @Field(() => Int)
  repositoriesCount?: number;
  @Field(() => Int)
  totalStarsCount?: number;
}

@ObjectType({ implements: [Node, Owner] })
export class OwnerUser extends Owner {
  @Field(() => Int)
  contributionsCount?: number;
  @Field(() => Int)
  publicContributionsCount?: number;
  @Field(() => Int)
  followersCount?: number;
  @Field(() => Int)
  pullRequestsCount?: number;
  @Field(() => Int)
  openIssuesCount?: number;
  @Field(() => Int)
  closedIssuesCount?: number;
  @Field(() => Int)
  repositoriesContributedToCount?: number;
  company?: string;
}

@ObjectType({ implements: [Node, Owner] })
export class OwnerOrganization extends Owner {}
