import { persianNumbers } from '@matnbaz/common';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { CgSpinner } from 'react-icons/cg';
import { InfiniteScroll } from '../../../components/Feature/InfiniteScroll';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { PageHeader } from '../../../components/Layout/PageHeader';
import {
  OwnerOrder,
  useGetGithubOwnersQuery,
} from '../../../lib/graphql-types';

const GithubTopUsersPage: NextPage = () => {
  const { data, fetchMore, loading } = useGetGithubOwnersQuery({
    variables: { order: OwnerOrder.PublicContributionsDesc },
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
      <NextSeo
        title="کاربران برتر گیت‌هاب"
        description="در این صفحه کاربران ایرانی گیت‌هاب بر اساس مشارکت‌های عمومی آن‌ها به مخزن‌های اپن‌سورس لیست شده‌اند."
      />

      <PageHeader
        title="کاربران برتر گیت‌هاب"
        description="در این صفحه کاربران ایرانی گیت‌هاب بر اساس مشارکت‌های عمومی آن‌ها به مخزن‌های اپن‌سورس لیست شده‌اند."
      />

      <div dir="ltr" className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-secondary tracking-wider"
                    >
                      رتبه
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary tracking-wider"
                    >
                      نام کاربر
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary tracking-wider"
                    >
                      شرکت
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-secondary tracking-wider"
                    >
                      توییتر
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-secondary tracking-wider"
                    >
                      دنبال‌کنندگان
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-secondary tracking-wider"
                    >
                      مشارکت‌های عمومی
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <InfiniteScroll
                    dataLength={data?.owners.edges.length || 0}
                    onLoadMore={ownersLoadMoreHandler}
                  >
                    {data?.owners.edges.map(({ node: owner }, index) => (
                      <tr
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        key={owner.login}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-center font-bold">
                          <span dir="rtl">{persianNumbers(index + 1)}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <Link href={`/github/${owner.login}`}>
                                <a target="_blank">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={`https://github.com/${owner.login}.png`}
                                    alt={`عکس ${owner.name || owner.login}`}
                                  />
                                </a>
                              </Link>
                            </div>
                            <div className="ml-4">
                              <Link href={`/github/${owner.login}`}>
                                <a target="_blank">
                                  <div className="text-sm font-medium">
                                    {owner.name}
                                  </div>
                                </a>
                              </Link>
                              <Link href={`/github/${owner.login}`}>
                                <a target="_blank">
                                  <div className="text-sm text-secondary">
                                    @{owner.login}
                                  </div>
                                </a>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm truncate">
                            {owner.company}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {owner.twitterUsername && (
                            <a
                              href={`https://twitter.com/${owner.twitterUsername}`}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm underline"
                            >
                              @{owner.twitterUsername}
                            </a>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center">
                          <span dir="rtl">
                            {owner.followersCount &&
                              `${persianNumbers(owner.followersCount)} نفر`}
                          </span>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap text-center"
                          dir="rtl"
                        >
                          {owner.publicContributionsCount &&
                            `${persianNumbers(owner.publicContributionsCount)}`}
                        </td>
                      </tr>
                    ))}
                  </InfiniteScroll>
                </tbody>
              </table>
              {loading && (
                <CgSpinner className="w-10 h-10 mx-auto mt-4 animate-spin" />
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GithubTopUsersPage;
