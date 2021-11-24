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

export type Language = {
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

export type License = {
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

export type Owner = {
  __typename?: 'Owner';
  extractedAt: Scalars['DateTime'];
  gravatarId: Scalars['String'];
  id: Scalars['String'];
  login: Scalars['String'];
  platform: PlatformType;
  platformId: Scalars['ID'];
  recordUpdatedAt: Scalars['DateTime'];
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
  repositories: RepositoryConnection;
  repositoryById?: Maybe<Repository>;
  repositoryByPlatform?: Maybe<Repository>;
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
  id: Scalars['String'];
};


export type QueryOwnerByLoginArgs = {
  login: Scalars['String'];
};


export type QueryOwnerByPlatformArgs = {
  id: Scalars['ID'];
  platform: PlatformType;
};


export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  languages?: InputMaybe<Array<Scalars['String']>>;
  last?: InputMaybe<Scalars['Int']>;
  order?: InputMaybe<RepoOrder>;
  searchTerm?: InputMaybe<Scalars['String']>;
  sourceType?: InputMaybe<RepoSourceType>;
  type?: InputMaybe<Array<RepoType>>;
};


export type QueryRepositoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryRepositoryByPlatformArgs = {
  id: Scalars['ID'];
  platform: PlatformType;
};


export type QueryTopicArgs = {
  name: Scalars['String'];
};


export type QueryTopicByIdArgs = {
  id: Scalars['String'];
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

/** The repo type used in filters. */
export enum RepoSourceType {
  /** Doesn't apply any filter to the query. */
  All = 'ALL',
  /** Only returns the forked repositories. */
  Fork = 'FORK',
  /** Only returns the source repositories. */
  Source = 'SOURCE'
}

/** The repo type used in filters. */
export enum RepoType {
  /** Only returns the archived repositories. */
  Archive = 'ARCHIVE',
  /** Only returns the template repositories. */
  Template = 'TEMPLATE'
}

export type Repository = {
  __typename?: 'Repository';
  allowForking: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  defaultBranch: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  descriptionDirection: ScriptDirection;
  disabled: Scalars['Boolean'];
  extractedAt: Scalars['DateTime'];
  forksCount: Scalars['Int'];
  fullName: Scalars['String'];
  hasIssues: Scalars['Boolean'];
  hasPages: Scalars['Boolean'];
  hasProjects: Scalars['Boolean'];
  hasWiki: Scalars['Boolean'];
  homePage?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  isFork: Scalars['Boolean'];
  isTemplate: Scalars['Boolean'];
  language?: Maybe<Language>;
  licenseId: Scalars['String'];
  limitedDescription?: Maybe<Scalars['String']>;
  mirrorUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  openIssuesCount: Scalars['Int'];
  owner?: Maybe<Owner>;
  ownerId: Scalars['String'];
  platform: PlatformType;
  platformId: Scalars['ID'];
  platformUrl?: Maybe<Scalars['String']>;
  pushedAt: Scalars['DateTime'];
  recordUpdatedAt: Scalars['DateTime'];
  size: Scalars['Int'];
  stargazersCount: Scalars['Int'];
  topics: Array<Topic>;
  updatedAt: Scalars['DateTime'];
  watchersCount: Scalars['Int'];
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

export type Topic = {
  __typename?: 'Topic';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
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

export type GetLanguagesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesQuery = { __typename?: 'Query', languages: { __typename?: 'LanguageConnection', edges?: Array<{ __typename?: 'LanguageEdge', node: { __typename?: 'Language', id: string, name: string, slug: string, repositoriesCount: number } }> | null | undefined } };

export type GetRepositoriesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
  searchTerm?: InputMaybe<Scalars['String']>;
  languages?: InputMaybe<Array<Scalars['String']> | Scalars['String']>;
  order?: InputMaybe<RepoOrder>;
}>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', fullName: string, limitedDescription?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, platformId: string } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } };


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
export const GetRepositoriesDocument = gql`
    query GetRepositories($after: String, $searchTerm: String, $languages: [String!], $order: RepoOrder) {
  repositories(
    first: 8
    after: $after
    searchTerm: $searchTerm
    languages: $languages
    order: $order
  ) {
    edges {
      node {
        fullName
        limitedDescription
        stargazersCount
        forksCount
        openIssuesCount
        language {
          name
          color
        }
        owner {
          type
          platformId
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
    `;

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
 *      after: // value for 'after'
 *      searchTerm: // value for 'searchTerm'
 *      languages: // value for 'languages'
 *      order: // value for 'order'
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