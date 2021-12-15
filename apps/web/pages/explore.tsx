import HeaderMeta, { IHeaderMetaTags } from '../components/Feature/HeaderMeta';
import RepositoryFilters from '../components/Filter/RepositoryFilters';
import MainLayout from '../components/Layout/MainLayout';
import SubmitUserModal from '../components/Modal/SubmitUserModal';
import RepositoryPreviewList from '../components/Repository/RepositoryPreviewList';
import RepositoryPreviewSkeletonLoader from '../components/Skeleton Loader/RepositoryPreviewSkeletonLoader';
import Button from '../components/UI/Button/Button';
import Divider from '../components/UI/Divider';
import { useGetRepositoriesLazyQuery } from '../lib/graphql-types';

export const exploreMetaTags: IHeaderMetaTags = {
  title: 'کاوش‌گر',
  description: 'پروژه های متن باز (Open Source) مختلف ایرانی را پیدا کنید.',
  image: '',
};

const Explore = () => {
  const [
    getRepositories,
    { loading, data, error, fetchMore, refetch, networkStatus, called },
  ] = useGetRepositoriesLazyQuery({ notifyOnNetworkStatusChange: true });
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

  const page = error ? (
    <div className="flex flex-col space-y-6 items-center justify-center h-80">
      <h1 className="text-5xl font-bold">خطا در بارگیری!</h1>
      <span className="text-3xl">لطفا چند لحظه بعد دوباره امتحان کنید.</span>
      <Button.Primary
        disabled={loading}
        onClick={() => {
          refetch();
        }}
      >
        امتحان مجدد
      </Button.Primary>
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-8 pb-6 gap-6">
      <div className="md:col-span-3 lg:col-span-2">
        <RepositoryFilters
          called={called}
          query={getRepositories}
          refetch={refetch}
          loading={loading}
        />
      </div>
      {data?.repositories?.edges.length === 0 ? (
        <div className="flex flex-col space-y-4 md:col-span-5 lg:col-span-6">
          <h1 className="text-2xl font-semibold">نتیجه ای یافت نشد.</h1>
          <span className="font-lg">
            نتیجه ای با فیلتر‌های وارد شده یافت نشد.
          </span>
          <Divider />
          <span className="text-sm text-secondary">
            می توانید با{' '}
            <SubmitUserModal className="text-blue-500" title="ثبت دستی کاربر" />{' '}
            به کاوش بهتر مخزن‌ها کمک کنید.
          </span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:col-span-5 lg:col-span-6 auto-rows-min">
          {/* // Network status 4 is when refetch gets called and network status 3 is for when fetchMore gets called
          // In this case we don't want skeleton loaders to appear when the user is trying to load more data
          // So it checks if it's 4 */}
          {(loading && networkStatus !== 3) || !called ? (
            <>
              {[...Array(6).keys()].map((number) => (
                <RepositoryPreviewSkeletonLoader key={number} />
              ))}
            </>
          ) : (
            <RepositoryPreviewList
              repositories={repositories}
              onLoadMore={repositoriesLoadMoreHandler}
            />
          )}
        </div>
      )}
    </div>
  );

  return (
    <HeaderMeta {...exploreMetaTags}>
      <MainLayout withoutFooter={!error}>{page}</MainLayout>
    </HeaderMeta>
  );
};

export default Explore;
