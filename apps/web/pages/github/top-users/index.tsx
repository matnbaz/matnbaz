import { persianNumbers } from '@matnbaz/common';
import { NextPage } from 'next';
import { InfiniteScroll } from '../../../components/Feature/InfiniteScroll';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { PageHeader } from '../../../components/Layout/PageHeader';
import {
  OwnerOrder,
  useGetGithubOwnersQuery,
} from '../../../lib/graphql-types';

const GithubTopUsersPage: NextPage = () => {
  const { data, fetchMore } = useGetGithubOwnersQuery({
    variables: { order: OwnerOrder.ContributionsDesc },
  });

  const ownersLoadMoreHandler = () => {
    if (!data?.owners.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.owners.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="کاربران برتر گیت‌هاب"
        description="در این صفحه کاربران ایرانی گیت‌هاب بر اساس مشارکت‌های عمومی آن‌ها به مخزن‌های اپن‌سورس لیست شده‌اند."
      />

      <div className="shadow overflow-hidden border-b border-zinc-200 dark:border-zinc-700 sm:rounded-lg">
        <table
          dir="ltr"
          className="min-w-full divide-y divide-zinc-200 dark:divide-zinc-700"
        >
          <thead className="bg-zinc-50 dark:bg-zinc-800">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider"
              >
                رتبه
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
              >
                نام کاربر
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
              >
                شرکت
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-secondary uppercase tracking-wider"
              >
                توییتر
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider"
              >
                مشارکت‌ها
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-center text-xs font-medium text-secondary uppercase tracking-wider"
              >
                دنبال‌کنندگان
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-zinc-900 divide-y divide-zinc-200 dark:divide-zinc-700">
            <InfiniteScroll
              dataLength={data?.owners.edges.length || 0}
              onLoadMore={ownersLoadMoreHandler}
            >
              {data?.owners.edges.map(({ node: owner }, index) => (
                <tr key={owner.login}>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center font-bold"
                    dir="rtl"
                  >
                    {persianNumbers(index + 1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={`https://github.com/${owner.login}.png`}
                          alt={`عکس ${owner.name || owner.login}`}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium">{owner.name}</div>
                        <div className="text-sm text-secondary">
                          @{owner.login}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{owner.company}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{owner.twitterUsername}</div>
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center"
                    dir="rtl"
                  >
                    {persianNumbers(owner.contributionsCount)}
                  </td>
                  <td
                    className="px-6 py-4 whitespace-nowrap text-center"
                    dir="rtl"
                  >
                    {persianNumbers(owner.followersCount)} نفر
                  </td>
                </tr>
              ))}
            </InfiniteScroll>
          </tbody>
        </table>
      </div>
    </MainLayout>
  );
};

export default GithubTopUsersPage;
