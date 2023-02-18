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
  @Field(() => Int, { nullable: true })
  repositoriesCount?: number;
  @Field(() => Int, { nullable: true })
  totalStarsCount?: number;
  @Field(() => Int, { nullable: true })
  totalStarsRank?: number;
}

@ObjectType({ implements: [Node, Owner] })
export class OwnerUser extends Owner {
  @Field(() => Int, { nullable: true })
  contributionsCount?: number;
  @Field(() => Int, { nullable: true })
  publicContributionsCount?: number;
  @Field(() => Int, { nullable: true })
  followersCount?: number;
  @Field(() => Int, { nullable: true })
  pullRequestsCount?: number;
  @Field(() => Int, { nullable: true })
  openIssuesCount?: number;
  @Field(() => Int, { nullable: true })
  closedIssuesCount?: number;
  @Field(() => Int, { nullable: true })
  repositoriesContributedToCount?: number;
  @Field(() => String, { nullable: true })
  company?: string;
  @Field(() => Int, { nullable: true })
  contributionsRank?: number;
  @Field(() => Int, { nullable: true })
  publicContributionsRank?: number;
  @Field(() => Int, { nullable: true })
  repositoriesContributedToRank?: number;
}

@ObjectType({ implements: [Node, Owner] })
export class OwnerOrganization extends Owner {}
