import { useMemo } from 'react';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import InfiniteScroll from '../Feature/InfiniteScroll';
import RepositoryPreview from './RepositoryPreview';

interface IRepositoryPreviewListProps {
  repositories: GetRepositoriesQuery['repositories']['edges'];
  onLoadMore?: () => void;
}

const RepositoryPreviewList = ({
  repositories,
  onLoadMore,
}: IRepositoryPreviewListProps) => {
  const mappedRepositories = useMemo(() => {
    return repositories.map((repository) => (
      <RepositoryPreview
        repository={repository.node}
        key={repository.node.fullName}
      />
    ));
  }, [repositories]);

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll onLoadMore={onLoadMore} dataLength={repositories.length}>
      {mappedRepositories}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
