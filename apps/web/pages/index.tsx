import Button from '../components/UI/Button';
import { useTheme } from 'next-themes';
import Card from '../components/UI/Card';
import RepositoryPreview from '../components/Repository/RepositoryPreview';
import { useGetRepositoriesQuery } from '../graphql-types';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loaders/RepositoryPreviewSkeletonLoader';
import InfiniteScroll from '../components/Feature/InfiniteScroll';
import { useState } from 'react';
import RepositoryPreviewList from '../components/Repository/RepositoryPreviewList';

export function Index() {
  const { theme, setTheme } = useTheme();
  const { loading, data, fetchMore } = useGetRepositoriesQuery();
  const repositories = data?.repositories.edges;
  const repositoriesPageInfo = data?.repositories.pageInfo;
  const repositoriesLoadMoreHandler = () => {
    if (!repositoriesPageInfo.hasNextPage) return;
    fetchMore({
      variables: {
        after: repositoriesPageInfo.endCursor,
      },
    });
  };
  return (
    <div className="p-6 grid grid-cols-4 gap-6">
      <div>
        <Card>
          <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            toggle
          </Button>
        </Card>
      </div>
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 col-span-4 md:col-span-3">
        {loading ? (
          <>
            {[...Array(6).keys()].map(() => (
              <RepositoryPreviewSkeletonLoader />
            ))}
          </>
        ) : data.repositories.edges.length ? (
          <RepositoryPreviewList
            repositories={repositories}
            onLoadMore={repositoriesLoadMoreHandler}
          />
        ) : (
          <div>
            <h1 className="text-2xl font-semibold mb-4">نتیجه ای یافت نشد.</h1>
            <span>هیچ نتیجه ای با فیلتر های وارد شده یافت نشد.</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
