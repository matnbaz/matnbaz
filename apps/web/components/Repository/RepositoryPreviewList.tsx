import { useMemo } from 'react';
import { InfiniteScroll } from '../Feature/InfiniteScroll';
import { RepositoryPreviewSkeletonLoader } from '../SkeletonLoader/RepositoryPreviewSkeletonLoader';
import {
  IRepositoryPreviewProps,
  RepositoryPreview,
} from './RepositoryPreview';

interface IRepositoryPreviewListProps {
  repositories: IRepositoryPreviewProps['repository'][];
  adsFrequency?: number;
  adsTemplate?: () => JSX.Element;
  loading?: boolean;
}

export interface IRepositoryPreviewListPropsWithoutPagination
  extends IRepositoryPreviewListProps {
  networkStatus?: never;
  called?: never;
  onLoadMore?: never;
}

export interface IRepositoryPreviewListPropsWithPagination
  extends IRepositoryPreviewListProps {
  loading: boolean;
  onLoadMore?: () => void;
  networkStatus?: number;
  called?: boolean;
}

export const RepositoryPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  repositories,
  adsFrequency,
  adsTemplate,
  onLoadMore,
}:
  | IRepositoryPreviewListPropsWithPagination
  | IRepositoryPreviewListPropsWithoutPagination) => {
  const mappedRepositories = useMemo(() => {
    return repositories?.map((repository, index) => (
      <>
        <RepositoryPreview padded repository={repository} key={repository.id} />
        {index !== 1 &&
          adsFrequency &&
          (index + 1) % adsFrequency === 0 &&
          adsTemplate()}
      </>
    ));
  }, [repositories]);

  const skeletonLoaders = useMemo(
    () =>
      [...Array(8).keys()].map((number) => (
        <RepositoryPreviewSkeletonLoader padded key={number} />
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
          <RepositoryPreviewSkeletonLoader padded key={number} />
        ))}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{loading ? skeletonLoaders : mappedRepositories}</>
  );
};
