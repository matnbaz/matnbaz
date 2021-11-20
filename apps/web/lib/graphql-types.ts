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
  name: Scalars['String'];
};

export type Owner = {
  __typename?: 'Owner';
  extractedAt: Scalars['DateTime'];
  gravatarId: Scalars['String'];
  id: Scalars['String'];
  login: Scalars['String'];
  nodeId: Scalars['String'];
  platform: PlatformType;
  platformId: Scalars['Float'];
  recordUpdatedAt: Scalars['DateTime'];
  repositories: RepositoryConnection;
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
  BitBucket = 'BitBucket',
  /** https://github.com */
  GitHub = 'GitHub',
  /** https://gitlab.com */
  GitLab = 'GitLab'
}

export type Query = {
  __typename?: 'Query';
  owner?: Maybe<Owner>;
  ownerByLogin?: Maybe<Owner>;
  ownerGithub?: Maybe<Owner>;
  repositories: RepositoryConnection;
  repositoryById?: Maybe<Repository>;
  repositoryGithub?: Maybe<Repository>;
  topic?: Maybe<Topic>;
  topicById?: Maybe<Topic>;
};


export type QueryOwnerArgs = {
  id: Scalars['String'];
};


export type QueryOwnerByLoginArgs = {
  login: Scalars['String'];
};


export type QueryOwnerGithubArgs = {
  id: Scalars['Float'];
};


export type QueryRepositoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryRepositoryByIdArgs = {
  id: Scalars['String'];
};


export type QueryRepositoryGithubArgs = {
  id: Scalars['Float'];
};


export type QueryTopicArgs = {
  name: Scalars['String'];
};


export type QueryTopicByIdArgs = {
  id: Scalars['String'];
};

export type Repository = {
  __typename?: 'Repository';
  allowForking: Scalars['Boolean'];
  archived: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  defaultBranch: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  disabled: Scalars['Boolean'];
  extractedAt: Scalars['DateTime'];
  forksCount: Scalars['Float'];
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
  nodeId: Scalars['String'];
  openIssuesCount: Scalars['Float'];
  owner?: Maybe<Owner>;
  ownerId: Scalars['String'];
  platform: PlatformType;
  platformId: Scalars['Float'];
  pushedAt: Scalars['DateTime'];
  recordUpdatedAt: Scalars['DateTime'];
  score?: Maybe<Scalars['Float']>;
  size: Scalars['Float'];
  stargazersCount: Scalars['Float'];
  topics: Array<Topic>;
  updatedAt: Scalars['DateTime'];
  watchersCount: Scalars['Float'];
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

export type GetRepositoriesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetRepositoriesQuery = { __typename?: 'Query', repositories: { __typename?: 'RepositoryConnection', edges?: Array<{ __typename?: 'RepositoryEdge', node: { __typename?: 'Repository', fullName: string, limitedDescription?: string | null | undefined, stargazersCount: number, forksCount: number, openIssuesCount: number, language?: { __typename?: 'Language', name: string, color?: string | null | undefined } | null | undefined, owner?: { __typename?: 'Owner', type: OwnerType, platformId: number } | null | undefined } }> | null | undefined, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, endCursor?: string | null | undefined } } };


export const GetRepositoriesDocument = gql`
    query GetRepositories($after: String) {
  repositories(first: 8, after: $after) {
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