import { persianNumbers } from '@matnbaz/common';
import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { PageHeader } from '../../../components/Layout/PageHeader';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetGithubOwnersDocument,
  GetGithubOwnersQueryResult,
  GetGithubOwnersQueryVariables,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';

export interface GithubTopUsersPageProps {
  owners: GetGithubOwnersQueryResult['data']['owners'];
}

const GithubTopUsersPage: NextPage<GithubTopUsersPageProps> = ({ owners }) => {
  const { t } = useTranslation('github-top-users');

  return (
    <MainLayout>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} description={t('page-description')} />

      <div dir="ltr" className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
                    >
                      {t('rank')}
                    </th>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
                    >
                      {t('user')}
                    </th>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
                    >
                      {t('company')}
                    </th>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-left text-xs font-medium tracking-wider"
                    >
                      {t('twitter')}
                    </th>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
                    >
                      {t('followers')}
                    </th>
                    <th
                      scope="col"
                      className="text-secondary px-6 py-3 text-center text-xs font-medium tracking-wider"
                    >
                      {t('public-contributions')}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {owners.edges.map(({ node: owner }, index) => (
                    <tr
                      className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                      key={owner.login}
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-center font-bold">
                        <span dir="rtl">{persianNumbers(index + 1)}</span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
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
                                <div className="text-secondary text-sm">
                                  @{owner.login}
                                </div>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="truncate text-sm">{owner.company}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
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
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <span dir="rtl">
                          {owner.followersCount &&
                            `${persianNumbers(owner.followersCount)}`}
                        </span>
                      </td>
                      <td
                        className="whitespace-nowrap px-6 py-4 text-center"
                        dir="rtl"
                      >
                        {owner.publicContributionsCount &&
                          `${persianNumbers(owner.publicContributionsCount)}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default GithubTopUsersPage;

export const getStaticProps: GetStaticProps<GithubTopUsersPageProps> = async ({
  locale,
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { owners },
  } = await apolloClient.query<
    GetGithubOwnersQueryResult['data'],
    GetGithubOwnersQueryVariables
  >({
    query: GetGithubOwnersDocument,
    variables: {},
  });

  return {
    revalidate: 60 * 60 * 12, // 12H
    props: {
      owners,
      ...(await serverSideTranslations(
        locale,
        ['common', 'github-top-users'],
        nextI18nextConfig
      )),
    },
  };
};
