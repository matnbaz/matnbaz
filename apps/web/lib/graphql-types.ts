import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

/** The repo type used in filters. */
export enum ArchiveStatusType {
  /** Doesn't apply any filter to the query. */
  All = 'ALL',
  /** Only returns the archived repositories. */
  Archived = 'ARCHIVED',
  /** Only returns the non-archived repositories. */
  NotArchived = 'NOT_ARCHIVED'
}

export type Collect = Node & {
  __typename?: 'Collect';
  collection: Collection;
  id: Scalars['ID'];
  repository: Repository;
};

export type CollectConnection = {
  __typename?: 'CollectConnection';
  /** A list of edges */
  edges?: Maybe<Array<CollectEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Collect edge. */
export type CollectEdge = {
  __typename?: 'CollectEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of CollectEdge. */
  node: Collect;
};

export type Collection = Node & {
  __typename?: 'Collection';
  collects: CollectConnection;
  color?: Maybe<Color>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  repositoriesCount: Scalars['Int'];
  slug: Scalars['String'];
};


export type CollectionCollectsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** Nice name, isn't it? */
export type CollectionConnection = {
  __typename?: 'CollectionConnection';
  /** A list of edges */
  edges?: Maybe<Array<CollectionEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Collection edge. */
export type CollectionEdge = {
  __typename?: 'CollectionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of CollectionEdge. */
  node: Collection;
};

export type Color = {
  __typename?: 'Color';
  hexString: Scalars['String'];
  rgba: Rgba;
};

export type DateObject = {
  __typename?: 'DateObject';
  difference: Scalars['String'];
  formatted: Scalars['String'];
  original: Scalars['DateTime'];
};


export type DateObjectDifferenceArgs = {
  persianNumbers?: InputMaybe<Scalars['Boolean']>;
};


export type DateObjectFormattedArgs = {
  format?: InputMaybe<Scalars['String']>;
  persianNumbers?: InputMaybe<Scalars['Boolean']>;
};

/** The repo type used in filters. */
export enum ForkStatusType {
  /** Doesn't apply any filter to the query. */
  All = 'ALL',
  /** Only returns the forked repositories. */
  Fork = 'FORK',
  /** Only returns the source (not forked) repositories. */
  Source = 'SOURCE'
}

export type Language = Node & {
  __typename?: 'Language';
  color?: Maybe<Color>;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  repositories: RepositoryConnection;
  repositoriesCount: Scalars['Int'];
  slug: Scalars['String'];
};


export type LanguageRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LanguageConnection = {
  __typename?: 'LanguageConnection';
  /** A list of edges */
  edges?: Maybe<Array<LanguageEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Language edge. */
export type LanguageEdge = {
  __typename?: 'LanguageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of LanguageEdge. */
  node: Language;
};

/** You can order repositories with one of these options. */
export enum LanguageOrder {
  /** Order by repositories count in descending direction. */
  RepositoriesDesc = 'REPOSITORIES_DESC'
}

export type License = Node & {
  __typename?: 'License';
  id: Scalars['ID'];
  key: Scalars['String'];
  name: Scalars['String'];
  repositories: RepositoryConnection;
  repositoriesCount: Scalars['Int'];
  spdxId: Scalars['String'];
};


export type LicenseRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LicenseConnection = {
  __typename?: 'LicenseConnection';
  /** A list of edges */
  edges?: Maybe<Array<LicenseEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A License edge. */
export type LicenseEdge = {
  __typename?: 'LicenseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of LicenseEdge. */
  node: License;
};

/** You can order repositories with one of these options. */
export enum LicenseOrder {
  /** Order by repositories count in descending direction. */
  RepositoriesDesc = 'REPOSITORIES_DESC'
}

export type Metadata = {
  __typename?: 'Metadata';
  totalLanguagesCount: Scalars['Int'];
  totalOwnersCount: Scalars['Float'];
  totalReposCount: Scalars['Float'];
  totalTopicsCount: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  report: Report;
  /** @deprecated Use `report` for now */
  reportOwner: Report;
  /** @deprecated Use `report` for now */
  reportRepository: Report;
  sendSubmission: SubmissionPayload;
};


export type MutationReportArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
  subject: ReportableType;
};


export type MutationReportOwnerArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};


export type MutationReportRepositoryArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};


export type MutationSendSubmissionArgs = {
  platform: PlatformType;
  username: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Owner = Node & {
  __typename?: 'Owner';
  id: Scalars['ID'];
  login: Scalars['String'];
  platform: PlatformType;
  platformId: Scalars['ID'];
  repositories: RepositoryConnection;
  repositoriesCount: Scalars['Int'];
  siteAdmin: Scalars['Boolean'];
  type: OwnerType;
};


export type OwnerRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

/** A repository owner could any of these types. */
export enum OwnerType {
  /** Owner is an organization. */
  Organization = 'Organization',
  /** Owner is a user. */
  User = 'User'
}

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** The cursor of the last edge in the connection. */
  endCursor?: Maybe<Scalars['String']>;
  /** Indicates if there are more pages to fetch. */
  hasNextPage: Scalars['Boolean'];
  /** Indicates if there are any pages prior to the current page. */
  hasPreviousPage: Scalars['Boolean'];
  /** The cursor of the first edge in the connection. */
  startCursor?: Maybe<Scalars['String']>;
};

/** A repository owner could any of these types. */
export enum PlatformType {
  /** https://bitbucket.com */
  Bitbucket = 'Bitbucket',
  /** https://github.com */
  GitHub = 'GitHub',
  /** https://gitlab.com */
  GitLab = 'GitLab'
}

export type Post = Node & {
  __typename?: 'Post';
  author: User;
  content: Scalars['String'];
  contentHtml: Scalars['String'];
  createdAt: DateObject;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  publishedAt?: Maybe<DateObject>;
  slug: Scalars['String'];
  summary?: Maybe<Scalars['String']>;
  summaryLimited?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  title: Scalars['String'];
  updatedAt: DateObject;
};

export type PostConnection = {
  __typename?: 'PostConnection';
  /** A list of edges */
  edges?: Maybe<Array<PostEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Post edge. */
export type PostEdge = {
  __typename?: 'PostEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of PostEdge. */
  node: Post;
};

export type Query = {
  __typename?: 'Query';
  collect: Collect;
  collection?: Maybe<Collection>;
  collectionById?: Maybe<Collection>;
  collections: CollectionConnection;
  language?: Maybe<Language>;
  languages: LanguageConnection;
  licenses: LicenseConnection;
  metadata: Metadata;
  owner?: Maybe<Owner>;
  ownerByPlatform?: Maybe<Owner>;
  ownerByPlatformId?: Maybe<Owner>;
  postBySlug?: Maybe<Post>;
  posts: PostConnection;
  repositories: RepositoryConnection;
  repositoryById?: Maybe<Repository>;
  repositoryByPlatform?: Maybe<Repository>;
  repositoryByPlatformId?: Maybe<Repository>;
  topic?: Maybe<Topic>;
  topicById?: Maybe<Topic>;
  topics: TopicConnection;
  userByUsername?: Maybe<User>;
};


export type QueryCollectArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionArgs = {
  slug: Scalars['String'];
};


export type QueryCollectionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCollectionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryLanguageArgs = {
  slug: Scalars['String'];
};


export type QueryLanguagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<LanguageOrder>;
};


export type QueryLicensesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<LicenseOrder>;
};


export type QueryOwnerArgs = {
  id: Scalars['ID'];
};


export type QueryOwnerByPlatformArgs = {
  owner: Scalars['String'];
  platform: PlatformType;
};


export type QueryOwnerByPlatformIdArgs = {
  id: Scalars['ID'];
  platform: PlatformType;
};


export type QueryPostBySlugArgs = {
  slug: Scalars['String'];
};


export type QueryPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  archiveStatus?: InputMaybe<ArchiveStatusType>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forkStatus?: InputMaybe<ForkStatusType>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  licenses?: InputMaybe<Array<Scalars['String']>>;
  order?: InputMaybe<RepoOrder>;
  searchTerm?: InputMaybe<Scalars['String']>;
  templateStatus?: InputMaybe<TemplateStatusType>;
};


export type QueryRepositoryByIdArgs = {
  id: Scalars['ID'];
};


export type QueryRepositoryByPlatformArgs = {
  owner: Scalars['String'];
  platform: PlatformType;
  repo: Scalars['String'];
};


export type QueryRepositoryByPlatformIdArgs = {
  id: Scalars['ID'];
  platform: PlatformType;
};


export type QueryTopicArgs = {
  name: Scalars['String'];
};


export type QueryTopicByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTopicsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<TopicOrder>;
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};

export type Rgba = {
  __typename?: 'RGBA';
  alpha: Scalars['Float'];
  blue: Scalars['Int'];
  green: Scalars['Int'];
  red: Scalars['Int'];
};

/** You can order repositories with one of these options. */
export enum RepoOrder {
  /** Order by creation date in ascending direction. */
  CreatedAsc = 'CREATED_ASC',
  /** Order by creation date in descending direction. */
  CreatedDesc = 'CREATED_DESC',
  /** Order by last push's date in ascending direction. */
  PushedAsc = 'PUSHED_ASC',
  /** Order by last push's date in descending direction. */
  PushedDesc = 'PUSHED_DESC',
  /** Order by most stars in descending direction. */
  StarsDesc = 'STARS_DESC',
  /** Order by trendy-ness in monthly scope. */
  TrendingMonthly = 'TRENDING_MONTHLY',
  /** Order by trendy-ness in weekly scope. */
  TrendingWeekly = 'TRENDING_WEEKLY',
  /** Order by trendy-ness in yearly scope. */
  TrendingYearly = 'TRENDING_YEARLY'
}

export type Report = Node & {
  __typename?: 'Report';
  id: Scalars['ID'];
  reason: Scalars['String'];
  recordUpdatedAt: DateObject;
  reportableType: ReportableType;
};

/** A reportable could any of these types. */
export enum ReportableType {
  /** Reportable is an owner. */
  Owner = 'Owner',
  /** Reportable is a repository. */
  Repository = 'Repository'
}

export type Repository = Node & {
  __typename?: 'Repository';
  archived: Scalars['Boolean'];
  createdAt: DateObject;
  defaultBranch: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  descriptionDirection: ScriptDirection;
  descriptionLimited?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  forksCount: Scalars['Int'];
  fullName: Scalars['String'];
  homePage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFork: Scalars['Boolean'];
  isNew: Scalars['Boolean'];
  isTemplate: Scalars['Boolean'];
  language?: Maybe<Language>;
  license?: Maybe<License>;
  name: Scalars['String'];
  openGraphImageUrl?: Maybe<Scalars['String']>;
  openIssuesCount: Scalars['Int'];
  owner?: Maybe<Owner>;
  platform: PlatformType;
  platformId: Scalars['ID'];
  platformUrl?: Maybe<Scalars['String']>;
  pushedAt: DateObject;
  readme?: Maybe<Scalars['String']>;
  readmeHtml?: Maybe<Scalars['String']>;
  relatedRepos: RepositoryConnection;
  size: Scalars['Int'];
  stargazersCount: Scalars['Int'];
  topics: Array<Topic>;
  updatedAt: DateObject;
  watchersCount: Scalars['Int'];
};


export type RepositoryRelatedReposArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type RepositoryConnection = {
  __typename?: 'RepositoryConnection';
  /** A list of edges */
  edges?: Maybe<Array<RepositoryEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Repository edge. */
export type RepositoryEdge = {
  __typename?: 'RepositoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of RepositoryEdge. */
  node: Repository;
};

/** A repository owner could any of these types. */
export enum ScriptDirection {
  /** left-to-right */
  Ltr = 'LTR',
  /** right-to-left */
  Rtl = 'RTL'
}

export type Submission = Node & {
  __typename?: 'Submission';
  id: Scalars['ID'];
  platform: PlatformType;
  username: Scalars['String'];
};

export type SubmissionPayload = {
  __typename?: 'SubmissionPayload';
  submission?: Maybe<Submission>;
  userErrors?: Maybe<Array<UserError>>;
};

/** The repo type used in filters. */
export enum TemplateStatusType {
  /** Doesn't apply any filter to the query. */
  All = 'ALL',
  /** Only returns the non-template repositories. */
  NotTemplate = 'NOT_TEMPLATE',
  /** Only returns the template repositories. */
  Template = 'TEMPLATE'
}

export type Topic = Node & {
  __typename?: 'Topic';
  createdAt: DateObject;
  id: Scalars['ID'];
  name: Scalars['String'];
  repositories: RepositoryConnection;
  repositoriesCount: Scalars['Int'];
};


export type TopicRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type TopicConnection = {
  __typename?: 'TopicConnection';
  /** A list of edges */
  edges?: Maybe<Array<TopicEdge>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** A Topic edge. */
export type TopicEdge = {
  __typename?: 'TopicEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of TopicEdge. */
  node: Topic;
};

/** You can order repositories with one of these options. */
export enum TopicOrder {
  /** Order by repositories count in descending direction. */
  RepositoriesDesc = 'REPOSITORIES_DESC'
}

export type User = Node & {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  posts: PostConnection;
  repositories: RepositoryConnection;
  username: Scalars['String'];
};


export type UserPostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type UserRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type UserError = {
  __typename?: 'UserError';
  message: Scalars['String'];
  path?: Maybe<Array<Scalars['String']>>;
};

export type FullRepoFragment = { __typename?: 'Repository', id: string, fullName: string, name: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, archived: boolean, isTemplate: boolean, defaultBranch: string, homePage?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, readmeHtml?: string | null | undefined, openGraphImageUrl?: string | null | undefined, pushedAt: { __typename?: 'DateObject', difference: string }, createdAt: { __typename?: 'DateObject', formatted: string }, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined, license?: { __typename?: 'License', name: string, key: string, spdxId: string } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined };

export type RepoPreviewWithoutOwnerFragment = { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined };

export type RepoPreviewFragment = { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined };

export type ReportMutationVariables = Exact<{
  subject: ReportableType;
  id: Scalars['ID'];
  reason: Scalars['String'];
}>;


export type ReportMutation = { __typename?: 'Mutation', report: { __typename?: 'Report', id: string } };

export type SendSubmissionMutationVariables = Exact<{
  username: Scalars['String'];
  platform: PlatformType;
}>;


export type SendSubmissionMutation = { __typename?: 'Mutation', sendSubmission: { __typename?: 'SubmissionPayload', submission?: { __typename?: 'Submission', id: string } | null | undefined, userErrors?: Array<{ __typename?: 'UserError', message: string }> | null | undefined } };

export type GetCollectionQueryVariables = Exact<{
  slug: Scalars['String'];
  reposCount?: InputMaybe<Scalars['Int']>;
  reposAfter?: InputMaybe<Scalars['String']>;
}>;


export type GetCollectionQuery = { __typename?: 'Query', collection?: { __typename?: 'Collection', id: string, name: string, slug: string, description?: string | null | undefined, repositoriesCount: number, image?: string | null | undefined, color?: { __typename?: 'Color', hexString: string } | null | undefined, collects: { __typename?: 'CollectConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CollectEdge', node: { __typename?: 'Collect', repository: { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined } } }> | null | undefined } } | null | undefined };

export type GetCollectionsQueryVariables = Exact<{
  count?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: { __typename?: 'CollectionConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'CollectionEdge', node: { __typename?: 'Collection', id: string, name: string, slug: string, description?: string | null | undefined, repositoriesCount: number, image?: string | null | undefined, color?: { __typename?: 'Color', hexString: string } | null | undefined } }> | null | undefined } };

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesQuery = { __typename?: 'Query', languages: { __typename?: 'LanguageConnection', edges?: Array<{ __typename?: 'LanguageEdge', node: { __typename?: 'Language', id: string, name: string, slug: string, repositoriesCount: number } }> | null | undefined } };

export type GetOwnerQueryVariables = Exact<{
  owner: Scalars['String'];
  platform: PlatformType;
  reposCount?: InputMaybe<Scalars['Int']>;
  reposAfter?: InputMaybe<Scalars['String']>;
}>;


export type GetOwnerQuery = { __typename?: 'Query', ownerByPlatform?: { __typename?: 'Owner', id: string, repositoriesCount: number, type: OwnerType, login: string, platformId: string, platform: PlatformType, repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', cursor: string, node: { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } } | null | undefined };

export type GetPostQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetPostQuery = { __typename?: 'Query', postBySlug?: { __typename?: 'Post', id: string, slug: string, title: string, image?: string | null | undefined, contentHtml: string, tags: Array<string>, summaryLimited?: string | null | undefined, publishedAt?: { __typename?: 'DateObject', formatted: string, difference: string } | null | undefined, author: { __typename?: 'User', id: string, name?: string | null | undefined, username: string, bio?: string | null | undefined, avatar?: string | null | undefined } } | null | undefined };

export type GetPostsQueryVariables = Exact<{
  count?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PostConnection', pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined }, edges?: Array<{ __typename?: 'PostEdge', node: { __typename?: 'Post', id: string, slug: string, title: string, image?: string | null | undefined, tags: Array<string>, summaryLimited?: string | null | undefined, publishedAt?: { __typename?: 'DateObject', formatted: string, difference: string } | null | undefined, author: { __typename?: 'User', id: string, name?: string | null | undefined, username: string, bio?: string | null | undefined, avatar?: string | null | undefined } } }> | null | undefined } };

export type GetRepositoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  order?: InputMaybe<RepoOrder>;
  forkStatus?: InputMaybe<ForkStatusType>;
  templateStatus?: InputMaybe<TemplateStatusType>;
}>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } };

export type GetRepositoryQueryVariables = Exact<{
  owner: Scalars['String'];
  repo: Scalars['String'];
  platform: PlatformType;
  relatedReposFirst?: InputMaybe<Scalars['Int']>;
}>;


export type GetRepositoryQuery = { __typename?: 'Query', repositoryByPlatform?: { __typename?: 'Repository', id: string, fullName: string, name: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, archived: boolean, isTemplate: boolean, defaultBranch: string, homePage?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, readmeHtml?: string | null | undefined, openGraphImageUrl?: string | null | undefined, relatedRepos: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } }, pushedAt: { __typename?: 'DateObject', difference: string }, createdAt: { __typename?: 'DateObject', formatted: string }, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined, license?: { __typename?: 'License', name: string, key: string, spdxId: string } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined } | null | undefined };

export type GetSearchedRepositoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  searchTerm?: InputMaybe<Scalars['String']>;
}>;


export type GetSearchedRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', id: string, fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, descriptionDirection: ScriptDirection, stargazersCount: number, forksCount: number, openIssuesCount: number, isNew: boolean, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: { __typename?: 'Color', hexString: string } | null | undefined } | null | undefined } }> | null | undefined } };

export type MetadataQueryVariables = Exact<{ [key: string]: never; }>;


export type MetadataQuery = { __typename?: 'Query', metadata: { __typename?: 'Metadata', totalOwnersCount: number, totalReposCount: number, totalTopicsCount: number } };

export const FullRepoFragmentDoc = gql`
    fragment fullRepo on Repository {
  id
  fullName
  name
  platformUrl
  platform
  descriptionLimited
  descriptionDirection
  archived
  isTemplate
  defaultBranch
  pushedAt {
    difference(persianNumbers: true)
  }
  createdAt {
    formatted(persianNumbers: true)
  }
  homePage
  stargazersCount
  forksCount
  openIssuesCount
  readmeHtml
  openGraphImageUrl
  language {
    name
    color {
      hexString
    }
  }
  license {
    name
    key
    spdxId
  }
  owner {
    type
    login
    platformId
  }
}
    `;
export const RepoPreviewWithoutOwnerFragmentDoc = gql`
    fragment repoPreviewWithoutOwner on Repository {
  id
  fullName
  platformUrl
  platform
  descriptionLimited
  descriptionDirection
  stargazersCount
  forksCount
  openIssuesCount
  language {
    name
    color {
      hexString
    }
  }
  isNew
}
    `;
export const RepoPreviewFragmentDoc = gql`
    fragment repoPreview on Repository {
  ...repoPreviewWithoutOwner
  owner {
    type
    login
    platformId
  }
}
    ${RepoPreviewWithoutOwnerFragmentDoc}`;
export const ReportDocument = gql`
    mutation Report($subject: ReportableType!, $id: ID!, $reason: String!) {
  report(subject: $subject, id: $id, reason: $reason) {
    id
  }
}
    `;
export type ReportMutationFn = Apollo.MutationFunction<ReportMutation, ReportMutationVariables>;

/**
 * __useReportMutation__
 *
 * To run a mutation, you first call `useReportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportMutation, { data, loading, error }] = useReportMutation({
 *   variables: {
 *      subject: // value for 'subject'
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReportMutation(baseOptions?: Apollo.MutationHookOptions<ReportMutation, ReportMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportMutation, ReportMutationVariables>(ReportDocument, options);
      }
export type ReportMutationHookResult = ReturnType<typeof useReportMutation>;
export type ReportMutationResult = Apollo.MutationResult<ReportMutation>;
export type ReportMutationOptions = Apollo.BaseMutationOptions<ReportMutation, ReportMutationVariables>;
export const SendSubmissionDocument = gql`
    mutation SendSubmission($username: String!, $platform: PlatformType!) {
  sendSubmission(username: $username, platform: $platform) {
    submission {
      id
    }
    userErrors {
      message
    }
  }
}
    `;
export type SendSubmissionMutationFn = Apollo.MutationFunction<SendSubmissionMutation, SendSubmissionMutationVariables>;

/**
 * __useSendSubmissionMutation__
 *
 * To run a mutation, you first call `useSendSubmissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendSubmissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendSubmissionMutation, { data, loading, error }] = useSendSubmissionMutation({
 *   variables: {
 *      username: // value for 'username'
 *      platform: // value for 'platform'
 *   },
 * });
 */
export function useSendSubmissionMutation(baseOptions?: Apollo.MutationHookOptions<SendSubmissionMutation, SendSubmissionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendSubmissionMutation, SendSubmissionMutationVariables>(SendSubmissionDocument, options);
      }
export type SendSubmissionMutationHookResult = ReturnType<typeof useSendSubmissionMutation>;
export type SendSubmissionMutationResult = Apollo.MutationResult<SendSubmissionMutation>;
export type SendSubmissionMutationOptions = Apollo.BaseMutationOptions<SendSubmissionMutation, SendSubmissionMutationVariables>;
export const GetCollectionDocument = gql`
    query GetCollection($slug: String!, $reposCount: Int = 12, $reposAfter: String) {
  collection(slug: $slug) {
    id
    name
    slug
    description
    repositoriesCount
    image
    color {
      hexString
    }
    collects(first: $reposCount, after: $reposAfter) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          repository {
            ...repoPreview
          }
        }
      }
    }
  }
}
    ${RepoPreviewFragmentDoc}`;

/**
 * __useGetCollectionQuery__
 *
 * To run a query within a React component, call `useGetCollectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *      reposCount: // value for 'reposCount'
 *      reposAfter: // value for 'reposAfter'
 *   },
 * });
 */
export function useGetCollectionQuery(baseOptions: Apollo.QueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
      }
export function useGetCollectionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionQuery, GetCollectionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionQuery, GetCollectionQueryVariables>(GetCollectionDocument, options);
        }
export type GetCollectionQueryHookResult = ReturnType<typeof useGetCollectionQuery>;
export type GetCollectionLazyQueryHookResult = ReturnType<typeof useGetCollectionLazyQuery>;
export type GetCollectionQueryResult = Apollo.QueryResult<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetCollectionsDocument = gql`
    query GetCollections($count: Int, $after: String) {
  collections(first: $count, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        name
        slug
        description
        repositoriesCount
        image
        color {
          hexString
        }
      }
    }
  }
}
    `;

/**
 * __useGetCollectionsQuery__
 *
 * To run a query within a React component, call `useGetCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCollectionsQuery({
 *   variables: {
 *      count: // value for 'count'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetCollectionsQuery(baseOptions?: Apollo.QueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
      }
export function useGetCollectionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCollectionsQuery, GetCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCollectionsQuery, GetCollectionsQueryVariables>(GetCollectionsDocument, options);
        }
export type GetCollectionsQueryHookResult = ReturnType<typeof useGetCollectionsQuery>;
export type GetCollectionsLazyQueryHookResult = ReturnType<typeof useGetCollectionsLazyQuery>;
export type GetCollectionsQueryResult = Apollo.QueryResult<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetLanguagesDocument = gql`
    query GetLanguages {
  languages {
    edges {
      node {
        id
        name
        slug
        repositoriesCount
      }
    }
  }
}
    `;

/**
 * __useGetLanguagesQuery__
 *
 * To run a query within a React component, call `useGetLanguagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLanguagesQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
      }
export function useGetLanguagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesQuery, GetLanguagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLanguagesQuery, GetLanguagesQueryVariables>(GetLanguagesDocument, options);
        }
export type GetLanguagesQueryHookResult = ReturnType<typeof useGetLanguagesQuery>;
export type GetLanguagesLazyQueryHookResult = ReturnType<typeof useGetLanguagesLazyQuery>;
export type GetLanguagesQueryResult = Apollo.QueryResult<GetLanguagesQuery, GetLanguagesQueryVariables>;
export const GetOwnerDocument = gql`
    query GetOwner($owner: String!, $platform: PlatformType!, $reposCount: Int = 12, $reposAfter: String) {
  ownerByPlatform(owner: $owner, platform: $platform) {
    repositories(first: $reposCount, after: $reposAfter) {
      edges {
        cursor
        node {
          ...repoPreviewWithoutOwner
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
    id
    repositoriesCount
    type
    login
    platformId
    platform
  }
}
    ${RepoPreviewWithoutOwnerFragmentDoc}`;

/**
 * __useGetOwnerQuery__
 *
 * To run a query within a React component, call `useGetOwnerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnerQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      platform: // value for 'platform'
 *      reposCount: // value for 'reposCount'
 *      reposAfter: // value for 'reposAfter'
 *   },
 * });
 */
export function useGetOwnerQuery(baseOptions: Apollo.QueryHookOptions<GetOwnerQuery, GetOwnerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOwnerQuery, GetOwnerQueryVariables>(GetOwnerDocument, options);
      }
export function useGetOwnerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnerQuery, GetOwnerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOwnerQuery, GetOwnerQueryVariables>(GetOwnerDocument, options);
        }
export type GetOwnerQueryHookResult = ReturnType<typeof useGetOwnerQuery>;
export type GetOwnerLazyQueryHookResult = ReturnType<typeof useGetOwnerLazyQuery>;
export type GetOwnerQueryResult = Apollo.QueryResult<GetOwnerQuery, GetOwnerQueryVariables>;
export const GetPostDocument = gql`
    query GetPost($slug: String!) {
  postBySlug(slug: $slug) {
    id
    slug
    title
    image
    contentHtml
    tags
    summaryLimited
    publishedAt {
      formatted
      difference
    }
    author {
      id
      name
      username
      bio
      avatar
    }
  }
}
    `;

/**
 * __useGetPostQuery__
 *
 * To run a query within a React component, call `useGetPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetPostQuery(baseOptions: Apollo.QueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
      }
export function useGetPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostQuery, GetPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostQuery, GetPostQueryVariables>(GetPostDocument, options);
        }
export type GetPostQueryHookResult = ReturnType<typeof useGetPostQuery>;
export type GetPostLazyQueryHookResult = ReturnType<typeof useGetPostLazyQuery>;
export type GetPostQueryResult = Apollo.QueryResult<GetPostQuery, GetPostQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($count: Int = 12, $after: String) {
  posts(first: $count, after: $after) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        slug
        title
        image
        tags
        summaryLimited
        publishedAt {
          formatted
          difference
        }
        author {
          id
          name
          username
          bio
          avatar
        }
      }
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      count: // value for 'count'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;
export const GetRepositoriesDocument = gql`
    query GetRepositories($first: Int = 12, $after: String, $searchTerm: String, $languages: [String!], $order: RepoOrder, $forkStatus: ForkStatusType, $templateStatus: TemplateStatusType) {
  repositories(
    first: $first
    after: $after
    searchTerm: $searchTerm
    languages: $languages
    order: $order
    forkStatus: $forkStatus
    templateStatus: $templateStatus
  ) {
    edges {
      node {
        ...repoPreview
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    ${RepoPreviewFragmentDoc}`;

/**
 * __useGetRepositoriesQuery__
 *
 * To run a query within a React component, call `useGetRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoriesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      after: // value for 'after'
 *      searchTerm: // value for 'searchTerm'
 *      languages: // value for 'languages'
 *      order: // value for 'order'
 *      forkStatus: // value for 'forkStatus'
 *      templateStatus: // value for 'templateStatus'
 *   },
 * });
 */
export function useGetRepositoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetRepositoriesQuery, GetRepositoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepositoriesQuery, GetRepositoriesQueryVariables>(GetRepositoriesDocument, options);
      }
export function useGetRepositoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepositoriesQuery, GetRepositoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepositoriesQuery, GetRepositoriesQueryVariables>(GetRepositoriesDocument, options);
        }
export type GetRepositoriesQueryHookResult = ReturnType<typeof useGetRepositoriesQuery>;
export type GetRepositoriesLazyQueryHookResult = ReturnType<typeof useGetRepositoriesLazyQuery>;
export type GetRepositoriesQueryResult = Apollo.QueryResult<GetRepositoriesQuery, GetRepositoriesQueryVariables>;
export const GetRepositoryDocument = gql`
    query GetRepository($owner: String!, $repo: String!, $platform: PlatformType!, $relatedReposFirst: Int = 8) {
  repositoryByPlatform(owner: $owner, repo: $repo, platform: $platform) {
    ...fullRepo
    relatedRepos(first: $relatedReposFirst) {
      edges {
        node {
          ...repoPreview
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
    ${FullRepoFragmentDoc}
${RepoPreviewFragmentDoc}`;

/**
 * __useGetRepositoryQuery__
 *
 * To run a query within a React component, call `useGetRepositoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRepositoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRepositoryQuery({
 *   variables: {
 *      owner: // value for 'owner'
 *      repo: // value for 'repo'
 *      platform: // value for 'platform'
 *      relatedReposFirst: // value for 'relatedReposFirst'
 *   },
 * });
 */
export function useGetRepositoryQuery(baseOptions: Apollo.QueryHookOptions<GetRepositoryQuery, GetRepositoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRepositoryQuery, GetRepositoryQueryVariables>(GetRepositoryDocument, options);
      }
export function useGetRepositoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRepositoryQuery, GetRepositoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRepositoryQuery, GetRepositoryQueryVariables>(GetRepositoryDocument, options);
        }
export type GetRepositoryQueryHookResult = ReturnType<typeof useGetRepositoryQuery>;
export type GetRepositoryLazyQueryHookResult = ReturnType<typeof useGetRepositoryLazyQuery>;
export type GetRepositoryQueryResult = Apollo.QueryResult<GetRepositoryQuery, GetRepositoryQueryVariables>;
export const GetSearchedRepositoriesDocument = gql`
    query GetSearchedRepositories($first: Int = 5, $searchTerm: String) {
  repositories(first: $first, searchTerm: $searchTerm) {
    edges {
      node {
        ...repoPreview
      }
    }
  }
}
    ${RepoPreviewFragmentDoc}`;

/**
 * __useGetSearchedRepositoriesQuery__
 *
 * To run a query within a React component, call `useGetSearchedRepositoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSearchedRepositoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSearchedRepositoriesQuery({
 *   variables: {
 *      first: // value for 'first'
 *      searchTerm: // value for 'searchTerm'
 *   },
 * });
 */
export function useGetSearchedRepositoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetSearchedRepositoriesQuery, GetSearchedRepositoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSearchedRepositoriesQuery, GetSearchedRepositoriesQueryVariables>(GetSearchedRepositoriesDocument, options);
      }
export function useGetSearchedRepositoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSearchedRepositoriesQuery, GetSearchedRepositoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSearchedRepositoriesQuery, GetSearchedRepositoriesQueryVariables>(GetSearchedRepositoriesDocument, options);
        }
export type GetSearchedRepositoriesQueryHookResult = ReturnType<typeof useGetSearchedRepositoriesQuery>;
export type GetSearchedRepositoriesLazyQueryHookResult = ReturnType<typeof useGetSearchedRepositoriesLazyQuery>;
export type GetSearchedRepositoriesQueryResult = Apollo.QueryResult<GetSearchedRepositoriesQuery, GetSearchedRepositoriesQueryVariables>;
export const MetadataDocument = gql`
    query Metadata {
  metadata {
    totalOwnersCount
    totalReposCount
    totalTopicsCount
  }
}
    `;

/**
 * __useMetadataQuery__
 *
 * To run a query within a React component, call `useMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMetadataQuery({
 *   variables: {
 *   },
 * });
 */
export function useMetadataQuery(baseOptions?: Apollo.QueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
      }
export function useMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MetadataQuery, MetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MetadataQuery, MetadataQueryVariables>(MetadataDocument, options);
        }
export type MetadataQueryHookResult = ReturnType<typeof useMetadataQuery>;
export type MetadataLazyQueryHookResult = ReturnType<typeof useMetadataLazyQuery>;
export type MetadataQueryResult = Apollo.QueryResult<MetadataQuery, MetadataQueryVariables>;

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "Collect",
      "Collection",
      "Language",
      "License",
      "Owner",
      "Post",
      "Report",
      "Repository",
      "Submission",
      "Topic",
      "User"
    ]
  }
};
      export default result;
    