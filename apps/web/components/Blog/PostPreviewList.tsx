import { useMemo } from 'react';
import { InfiniteScroll } from '../Feature/InfiniteScroll';
import { PostPreviewSkeletonLoader } from '../SkeletonLoader/PostPreviewSkeletonLoader';
import { PostPreview, PostPreviewProps } from './PostPreview';

interface IPostPreviewListProps {
  posts: PostPreviewProps['post'][];
  loading?: boolean;
}

export interface IPostPreviewListPropsWithoutPagination
  extends IPostPreviewListProps {
  networkStatus?: never;
  called?: never;
  onLoadMore?: never;
}

export interface IPostPreviewListPropsWithPagination
  extends IPostPreviewListProps {
  loading: boolean;
  onLoadMore?: () => void;
  networkStatus?: number;
  called?: boolean;
}

export const PostPreviewList = ({
  loading,
  networkStatus = 0,
  called = true,
  posts,
  onLoadMore,
}:
  | IPostPreviewListPropsWithPagination
  | IPostPreviewListPropsWithoutPagination) => {
  const mappedPosts = useMemo(() => {
    return posts?.map((repository, index) => (
      <PostPreview post={repository} key={repository.id} />
    ));
  }, [posts]);

  const skeletonLoaders = useMemo(
    () =>
      [...Array(8).keys()].map((number) => (
        <PostPreviewSkeletonLoader padded key={number} />
      )),
    []
  );

  // If pagination is intended for the list, then infinite scroll wrapper is needed
  return onLoadMore ? (
    <InfiniteScroll onLoadMore={onLoadMore} dataLength={posts?.length || 0}>
      {
        // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
        // In this case we don't want skeleton loaders to appear when the user is trying to load more data
        // So it checks if it's not 3 (fetchMore)
      }

      {(loading && networkStatus !== 3) || !called
        ? skeletonLoaders
        : mappedPosts}
      {networkStatus === 3 &&
        [...Array(2).keys()].map((number) => (
          <PostPreviewSkeletonLoader padded key={number} />
        ))}
    </InfiniteScroll>
  ) : (
    // But if there is no onLoadMore it means that pagination is not needed
    // So infinite scroll is not needed as well
    <>{loading ? skeletonLoaders : mappedPosts}</>
  );
};
