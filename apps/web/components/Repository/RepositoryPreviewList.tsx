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
  return onLoadMore ? (
    <InfiniteScroll onLoadMore={onLoadMore}>
      {mappedRepositories}
    </InfiniteScroll>
  ) : (
    <>{mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
