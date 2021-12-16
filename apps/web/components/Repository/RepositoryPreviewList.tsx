import { useMemo } from 'react';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import InfiniteScroll from '../Feature/InfiniteScroll';
import RepositoryPreviewSkeletonLoader from '../Skeleton Loader/RepositoryPreviewSkeletonLoader';
import RepositoryPreview from './RepositoryPreview';

interface IRepositoryPreviewListProps {
  loading: boolean;
  networkStatus?: number;
  called?: boolean;
  repositories: GetRepositoriesQuery['repositories']['edges'];
  onLoadMore?: () => void;
}

const RepositoryPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  repositories,
  onLoadMore,
}: IRepositoryPreviewListProps) => {
  const mappedRepositories = useMemo(() => {
    {
      // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
      // In this case we don't want skeleton loaders to appear when the user is trying to load more data
      // So it checks if it's 4
    }

    return (loading && networkStatus !== 3) || !called ? (
      <>
        {[...Array(6).keys()].map((number) => (
          <RepositoryPreviewSkeletonLoader key={number} />
        ))}
      </>
    ) : (
      repositories.map((repository) => (
        <RepositoryPreview
          repository={repository.node}
          key={repository.node.fullName}
        />
      ))
    );
  }, [repositories, loading]);

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll
      onLoadMore={onLoadMore}
      dataLength={repositories?.length || 0}
    >
      {mappedRepositories}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
