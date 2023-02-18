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
  @Field(() => String, { nullable: true })
  name?: string;
  @Field(() => String, { nullable: true })
  about?: string;
  @Field(() => String)
  login: string;
  @Field(() => OwnerType)
  type: OwnerType;
  @Field(() => String, { nullable: true })
  twitterUsername?: string;
  @Field(() => String, { nullable: true })
  location?: string;
  @Field(() => String, { nullable: true })
  websiteUrl?: string;
  @Field(() => Int)
  repositoriesCount?: number;
  @Field(() => Int)
  totalStarsCount?: number;
  @Field(() => Int)
  totalStarsRank?: number;
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
  @Field(() => String, { nullable: true })
  company?: string;
  @Field(() => Int)
  contributionsRank?: number;
  @Field(() => Int)
  publicContributionsRank?: number;
  @Field(() => Int)
  repositoriesContributedToRank?: number;
}

@ObjectType({ implements: [Node, Owner] })
export class OwnerOrganization extends Owner {}
