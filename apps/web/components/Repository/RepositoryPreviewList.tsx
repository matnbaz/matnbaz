import { useMemo } from 'react';
import {
  GetRepositoriesQuery,
  GetSearchedRepositoriesQuery,
} from '../../lib/graphql-types';
import InfiniteScroll from '../Feature/InfiniteScroll';
import RepositoryPreviewSkeletonLoader from '../Skeleton Loader/RepositoryPreviewSkeletonLoader';
import RepositoryPreview from './RepositoryPreview';

interface IRepositoryPreviewListProps {
  repositories:
    | GetRepositoriesQuery['repositories']['edges']
    | GetSearchedRepositoriesQuery['repositories']['edges'];
  loading?: boolean;
}

interface IRepositoryPreviewListPropsWithoutPagination
  extends IRepositoryPreviewListProps {
  networkStatus?: never;
  called?: never;
  onLoadMore?: never;
}

interface IRepositoryPreviewListPropsWithPagination
  extends IRepositoryPreviewListProps {
  loading: boolean;
  onLoadMore?: () => void;
  networkStatus?: number;
  called?: boolean;
}

const RepositoryPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  repositories,
  onLoadMore,
}:
  | IRepositoryPreviewListPropsWithPagination
  | IRepositoryPreviewListPropsWithoutPagination) => {
  const mappedRepositories = useMemo(() => {
    return repositories?.map((repository) => (
      <RepositoryPreview
        repository={repository.node}
        key={repository.node.id}
      />
    ));
  }, [repositories]);

  const skeletonLoaders = useMemo(
    () =>
      [...Array(8).keys()].map((number) => (
        <RepositoryPreviewSkeletonLoader key={number} />
      )),
    []
  );

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll
      onLoadMore={onLoadMore}
      dataLength={repositories?.length || 0}
    >
      {
        // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
        // In this case we don't want skeleton loaders to appear when the user is trying to load more data
        // So it checks if it's not 3 (fetchMore)
      }

      {(loading && networkStatus !== 3) || !called
        ? skeletonLoaders
        : mappedRepositories}
      {networkStatus === 3 &&
        [...Array(2).keys()].map((number) => (
          <RepositoryPreviewSkeletonLoader key={number} />
        ))}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{loading ? skeletonLoaders : mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
