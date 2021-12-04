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
  color?: Maybe<Scalars['String']>;
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

export type Mutation = {
  __typename?: 'Mutation';
  reportOwner: Report;
  reportRepository: Report;
  submissionSubmit: Submission;
};


export type MutationReportOwnerArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};


export type MutationReportRepositoryArgs = {
  id: Scalars['ID'];
  reason: Scalars['String'];
};


export type MutationSubmissionSubmitArgs = {
  content: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Owner = Node & {
  __typename?: 'Owner';
  gravatarId: Scalars['String'];
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

export type Query = {
  __typename?: 'Query';
  language?: Maybe<Language>;
  languages: LanguageConnection;
  licenses: LicenseConnection;
  owner?: Maybe<Owner>;
  ownerByLogin?: Maybe<Owner>;
  ownerByPlatform?: Maybe<Owner>;
  ownerByPlatformId?: Maybe<Owner>;
  repositories: RepositoryConnection;
  repositoryById?: Maybe<Repository>;
  repositoryByPlatform?: Maybe<Repository>;
  repositoryByPlatformId?: Maybe<Repository>;
  topic?: Maybe<Topic>;
  topicById?: Maybe<Topic>;
  topics: TopicConnection;
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


export type QueryOwnerByLoginArgs = {
  login: Scalars['String'];
};


export type QueryOwnerByPlatformArgs = {
  owner: Scalars['String'];
  platform: PlatformType;
};


export type QueryOwnerByPlatformIdArgs = {
  id: Scalars['ID'];
  platform: PlatformType;
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
  StarsDesc = 'STARS_DESC'
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
  allowForking: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  createdAt: DateObject;
  defaultBranch: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  descriptionDirection: ScriptDirection;
  descriptionLimited?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  forksCount: Scalars['Int'];
  fullName: Scalars['String'];
  hasIssues: Scalars['Boolean'];
  hasPages: Scalars['Boolean'];
  hasProjects: Scalars['Boolean'];
  hasWiki: Scalars['Boolean'];
  homePage?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isFork: Scalars['Boolean'];
  isTemplate: Scalars['Boolean'];
  language?: Maybe<Language>;
  license?: Maybe<License>;
  mirrorUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
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
  content: Scalars['String'];
  id: Scalars['ID'];
  recordUpdatedAt: DateObject;
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

export type FullRepoFragment = { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, archived: boolean, isTemplate: boolean, defaultBranch: string, homePage?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, readmeHtml?: string | null | undefined, pushedAt: { __typename?: 'DateObject', difference: string }, createdAt: { __typename?: 'DateObject', formatted: string }, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined, license?: { __typename?: 'License', name: string, key: string, spdxId: string } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined };

export type RepoPreviewWithoutOwnerFragment = { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined };

export type RepoPreviewFragment = { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined };

export type ReportOwnerMutationVariables = Exact<{
  id: Scalars['ID'];
  reason: Scalars['String'];
}>;


export type ReportOwnerMutation = { __typename?: 'Mutation', reportOwner: { __typename?: 'Report', id: string } };

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesQuery = { __typename?: 'Query', languages: { __typename?: 'LanguageConnection', edges?: Array<{ __typename?: 'LanguageEdge', node: { __typename?: 'Language', id: string, name: string, slug: string, repositoriesCount: number } }> | null | undefined } };

export type GetOwnerQueryVariables = Exact<{
  owner: Scalars['String'];
  platform: PlatformType;
  reposCount?: InputMaybe<Scalars['Int']>;
  reposAfter?: InputMaybe<Scalars['String']>;
}>;


export type GetOwnerQuery = { __typename?: 'Query', ownerByPlatform?: { __typename?: 'Owner', id: string, repositoriesCount: number, type: OwnerType, login: string, platformId: string, repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', cursor: string, node: { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } } | null | undefined };

export type GetRepositoriesQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  after?: InputMaybe<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  order?: InputMaybe<RepoOrder>;
  forkStatus?: InputMaybe<ForkStatusType>;
  templateStatus?: InputMaybe<TemplateStatusType>;
}>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } };

export type GetRepositoryQueryVariables = Exact<{
  owner: Scalars['String'];
  repo: Scalars['String'];
  platform: PlatformType;
  relatedReposFirst?: InputMaybe<Scalars['Int']>;
}>;


export type GetRepositoryQuery = { __typename?: 'Query', repositoryByPlatform?: { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, archived: boolean, isTemplate: boolean, defaultBranch: string, homePage?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, readmeHtml?: string | null | undefined, relatedRepos: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', fullName: string, platformUrl?: string | null | undefined, platform: PlatformType, descriptionLimited?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } }, pushedAt: { __typename?: 'DateObject', difference: string }, createdAt: { __typename?: 'DateObject', formatted: string }, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined, license?: { __typename?: 'License', name: string, key: string, spdxId: string } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, login: string, platformId: string } | null | undefined } | null | undefined };

export const FullRepoFragmentDoc = gql`
    fragment fullRepo on Repository {
  fullName
  platformUrl
  platform
  descriptionLimited
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
  language {
    name
    color
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
  fullName
  platformUrl
  platform
  descriptionLimited
  stargazersCount
  forksCount
  openIssuesCount
  language {
    name
    color
  }
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
export const ReportOwnerDocument = gql`
    mutation ReportOwner($id: ID!, $reason: String!) {
  reportOwner(id: $id, reason: $reason) {
    id
  }
}
    `;
export type ReportOwnerMutationFn = Apollo.MutationFunction<ReportOwnerMutation, ReportOwnerMutationVariables>;

/**
 * __useReportOwnerMutation__
 *
 * To run a mutation, you first call `useReportOwnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReportOwnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reportOwnerMutation, { data, loading, error }] = useReportOwnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useReportOwnerMutation(baseOptions?: Apollo.MutationHookOptions<ReportOwnerMutation, ReportOwnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReportOwnerMutation, ReportOwnerMutationVariables>(ReportOwnerDocument, options);
      }
export type ReportOwnerMutationHookResult = ReturnType<typeof useReportOwnerMutation>;
export type ReportOwnerMutationResult = Apollo.MutationResult<ReportOwnerMutation>;
export type ReportOwnerMutationOptions = Apollo.BaseMutationOptions<ReportOwnerMutation, ReportOwnerMutationVariables>;
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

      export interface PossibleTypesResultData {
        possibleTypes: {
          [key: string]: string[]
        }
      }
      const result: PossibleTypesResultData = {
  "possibleTypes": {
    "Node": [
      "Language",
      "License",
      "Owner",
      "Report",
      "Repository",
      "Submission",
      "Topic"
    ]
  }
};
      export default result;
    