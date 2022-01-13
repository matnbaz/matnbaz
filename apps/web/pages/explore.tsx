import { useApolloClient } from '@apollo/client';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useMemo } from 'react';
import { PromotionBanner } from '../components/Banner/PromotionBanner';
import { RepositoryFilters } from '../components/Filter/RepositoryFilters';
import { MainLayout } from '../components/Layout/MainLayout';
import { PageHeader } from '../components/Layout/PageHeader';
import { SubmitUserModal } from '../components/Modal/SubmitUserModal';
import { RepositoryPreviewList } from '../components/Repository/RepositoryPreviewList';
import { Divider } from '../components/UI/Divider';
import { RepositoryFilterContextWrapper } from '../context/repository-filter-context';
import { useGetRepositoriesLazyQuery } from '../lib/graphql-types';
import Error500Page from './500';

const Explore: NextPage = () => {
  const [
    getRepositories,
    { loading, data, error, fetchMore, refetch, networkStatus, called },
  ] = useGetRepositoriesLazyQuery({ notifyOnNetworkStatusChange: true });
  const repositories = useMemo(() => data?.repositories.edges, [data]);
  const repositoriesPageInfo = useMemo(
    () => data?.repositories.pageInfo,
    [data]
  );
  const repositoriesLoadMoreHandler = () => {
    if (!repositoriesPageInfo?.hasNextPage || !repositoriesPageInfo) return;

    fetchMore({
      variables: {
        after: repositoriesPageInfo.endCursor,
      },
    });
  };

  const apolloClient = useApolloClient();
  // Removes the cache if you navigate to another page
  useEffect(
    () => () => {
      apolloClient.cache.evict({ id: 'ROOT_QUERY', fieldName: 'repositories' });
    },
    []
  );

  if (error) return <Error500Page />;

  return (
    <MainLayout withoutFooter={!error}>
      <NextSeo
        title="کاوش‌گر"
        description="پروژه های اوپن‌سورس (Open-Source) مختلف ایرانی را کشف کنید."
      />

      <PageHeader title="کاوش‌گر" />

      <div className="grid grid-cols-1 md:grid-cols-6 pb-6 gap-6 max-w-6xl mx-auto auto-rows-min auto-cols-min">
        <div className="md:col-span-2">
          <div className="md:sticky md:top-24 md:bottom-0 flex items-start justify-around">
            <div className="md:self-start md:overflow-y-auto md:max-h-[80vh] md:pl-2 w-full">
              <RepositoryFilterContextWrapper>
                <RepositoryFilters
                  called={called}
                  query={getRepositories}
                  refetch={refetch}
                  loading={loading}
                />
              </RepositoryFilterContextWrapper>
            </div>
          </div>
        </div>
        {data?.repositories?.edges.length === 0 ? (
          <div className="flex flex-col space-y-4 md:col-span-4">
            <h1 className="text-2xl font-semibold">نتیجه ای یافت نشد.</h1>
            <span className="font-lg">
              نتیجه ای با فیلتر‌های وارد شده یافت نشد.
            </span>
            <Divider />
            <span className="text-sm text-secondary">
              می توانید با{' '}
              <SubmitUserModal
                className="text-blue-500"
                title="ثبت دستی کاربر"
              />{' '}
              به کاوش بهتر مخزن‌ها کمک کنید.
            </span>
          </div>
        ) : (
          <div className="grid gap-6 md:col-span-4 auto-rows-min">
            <RepositoryPreviewList
              loading={loading}
              networkStatus={networkStatus}
              called={called}
              repositories={repositories}
              onLoadMore={repositoriesLoadMoreHandler}
              adsFrequency={10}
              adsTemplate={() => (
                <PromotionBanner className="rounded-xl overflow-hidden" />
              )}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Explore;
