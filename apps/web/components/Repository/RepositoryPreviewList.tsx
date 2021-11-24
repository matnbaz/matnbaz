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
  return (
    <InfiniteScroll onLoadMore={onLoadMore}>
      {repositories.map((repository) => (
        <RepositoryPreview
          repository={repository.node}
          key={repository.node.fullName}
        />
      ))}
    </InfiniteScroll>
  );
};

export default RepositoryPreviewList;
