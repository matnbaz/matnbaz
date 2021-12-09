import { useMemo } from 'react';
import { GetRepositoriesQuery } from '../../lib/graphql-types';
import InfiniteScroll from '../Feature/InfiniteScroll';
import RepositoryPreview from './RepositoryPreview';

interface IRepositoryPreviewListProps {
  repositories: GetRepositoriesQuery['repositories']['edges'];
  loading?: boolean;
  onLoadMore?: () => void;
}

const RepositoryPreviewList = ({
  repositories,
  loading = false,
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

  // useEffect(() => {
  //   if (document.body.clientHeight < window.innerHeight && !loading) {
  //     onLoadMore?.();
  //   }
  // }, [JSON.stringify(repositories)]);

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll onLoadMore={onLoadMore}>
      {mappedRepositories}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{mappedRepositories}</>
  );
};

export default RepositoryPreviewList;
