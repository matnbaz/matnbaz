import { localize, MINIMUM_STARS } from '@matnbaz/common';
import classNames from 'classnames';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useCallback } from 'react';
import {
  HiCollection,
  HiGlobeAlt,
  HiLocationMarker,
  HiOfficeBuilding,
  HiPuzzle,
  HiStar,
  HiUsers,
} from 'react-icons/hi';
import { IconType } from 'react-icons/lib';
import { SiGithub, SiTwitter } from 'react-icons/si';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { OwnerImage } from '../../../components/Owner/OwnerImage';
import { RepositoryPreviewList } from '../../../components/Repository/RepositoryPreviewList';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetOwnerDocument,
  GetOwnerQueryResult,
  GetOwnerQueryVariables,
  PlatformType,
  useGetOwnerQuery,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';
interface OwnerPageProps {
  ownerSlug: string;
}

const OwnerPage: NextPage<OwnerPageProps> = ({ ownerSlug }) => {
  const { t } = useTranslation('owner');
  const { locale } = useRouter();
  const {
    data: { ownerByPlatform: owner },
    fetchMore,
    loading,
    networkStatus,
    called,
  } = useGetOwnerQuery({
    variables: { owner: ownerSlug, platform: PlatformType.GitHub },
    notifyOnNetworkStatusChange: true,
  });
  const repositoriesLoadMoreHandler = useCallback(() => {
    console.log(owner.repositories.pageInfo.hasNextPage);
    if (!owner.repositories.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: owner.repositories.pageInfo.endCursor,
      },
    });
  }, [fetchMore, owner.repositories.pageInfo]);

  return (
    <MainLayout>
      <NextSeo
        title={owner.name || owner.login}
        description={t('page-description', { name: owner.name || owner.login })}
        openGraph={{
          images: [
            {
              url: `https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`,
              alt: owner.name || owner.login,
              height: 420,
              width: 420,
            },
          ],
        }}
        twitter={{ cardType: 'summary' }}
      />
      <div className="space-y-10">
        <div>
          <OwnerImage owner={owner} withoutLink className="mx-auto" />

          <h1
            dir="auto"
            className="mt-3 text-xl sm:text-2xl font-bold text-center"
          >
            {owner.name || owner.login}
          </h1>

          <div className="mt-1 mx-auto">
            {owner.about && (
              <p dir="auto" className="text-center text-sm text-secondary">
                {owner.about}
              </p>
            )}
            <div
              className="mt-2 flex gap-5 items-center justify-center flex-wrap"
              dir="ltr"
            >
              {owner.location && (
                <div className="flex-shrink-0 flex text-sm text-secondary items-center gap-2 max-w-xs overflow-hidden">
                  <HiLocationMarker className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{owner.location}</span>
                </div>
              )}
              {owner.__typename === 'OwnerUser' && owner.company && (
                <div className="flex-shrink-0 flex text-sm text-secondary items-center gap-2 max-w-xs overflow-hidden">
                  <HiOfficeBuilding className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{owner.company}</span>
                </div>
              )}
              {owner.websiteUrl && (
                <a
                  href={owner.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex text-sm text-secondary items-center gap-2 max-w-xs overflow-hidden"
                >
                  <HiGlobeAlt className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{owner.websiteUrl}</span>
                </a>
              )}
              <a
                href={`https://github.com/${owner.login}`}
                target="_blank"
                rel="noreferrer"
                className="flex-shrink-0 flex text-sm text-secondary items-center gap-2 max-w-xs overflow-hidden"
              >
                <SiGithub className="w-4 h-4 flex-shrink-0" />
                <span className="truncate">@{owner.login}</span>
              </a>
              {owner.twitterUsername && (
                <a
                  href={`https://twitter.com/${owner.twitterUsername}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 flex text-sm text-secondary items-center gap-2 max-w-xs overflow-hidden"
                >
                  <SiTwitter className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">@{owner.twitterUsername}</span>
                </a>
              )}
              {/* <div className="w-0.5 h-4 bg-gray-700 dark:bg-gray-200" />
              <OwnerReport
                owner={owner}
                button={({ onClick }) => (
                  <button onClick={onClick}>
                    <MdReport className="w-4 h-4" />
                  </button>
                )}
              /> */}
            </div>
          </div>

          {owner.__typename === 'OwnerUser' && (
            <>
              {owner.organizations.edges.length > 0 && (
                <div className="mt-4">
                  <div className="text-center text-xs font-bold text-secondary">
                    {t('organizations')}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {owner.organizations.edges.map(({ node: org }) => (
                      <OwnerImage
                        width={32}
                        height={32}
                        owner={org}
                        key={org.platformId}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
          {owner.__typename === 'OwnerOrganization' && (
            <>
              {owner.members.edges.length > 0 && (
                <div className="mt-4">
                  <div className="text-center text-xs font-bold text-secondary">
                    {t('members')}
                  </div>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    {owner.members.edges.map(({ node: member }) => (
                      <OwnerImage
                        width={32}
                        height={32}
                        owner={member}
                        key={member.platformId}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="grid sm:grid-cols-4 gap-8 pb-6 max-w-4xl mx-auto sm:grid-flow-row-dense">
          <div className="sm:col-start-4">
            <div
              className={classNames('grid grid-cols-2 sm:grid-cols-1 gap-6')}
            >
              {typeof owner.totalStarsCount === 'number' && (
                <Statistic
                  value={localize(owner.totalStarsCount, locale)}
                  subValue={
                    owner.totalStarsRank &&
                    ` (${t('rank')} ${localize(owner.totalStarsRank, locale)})`
                  }
                  icon={HiStar}
                  label={t('total-stars-count')}
                />
              )}
              {owner.__typename === 'OwnerUser' && (
                <Statistic
                  label={t('public-contributions-count')}
                  value={localize(owner.publicContributionsCount, locale)}
                  subValue={
                    owner.publicContributionsRank &&
                    ` (${t('rank')} ${localize(
                      owner.publicContributionsRank,
                      locale
                    )})`
                  }
                  icon={HiPuzzle}
                />
              )}
              {owner.__typename === 'OwnerUser' && (
                <Statistic
                  label={t('contributions-count')}
                  value={localize(owner.contributionsCount, locale)}
                  subValue={
                    owner.contributionsRank &&
                    ` (${t('rank')} ${localize(
                      owner.contributionsRank,
                      locale
                    )})`
                  }
                  icon={HiPuzzle}
                />
              )}
              {owner.__typename === 'OwnerUser' && (
                <Statistic
                  label={t('repositories-contributed-to-count')}
                  value={localize(owner.repositoriesContributedToCount, locale)}
                  subValue={
                    owner.repositoriesContributedToRank &&
                    ` (${t('rank')} ${localize(
                      owner.repositoriesContributedToRank,
                      locale
                    )})`
                  }
                  icon={HiCollection}
                />
              )}
              {owner.__typename === 'OwnerUser' && (
                <Statistic
                  label={t('followers-count')}
                  value={localize(owner.followersCount, locale)}
                  icon={HiUsers}
                />
              )}
              {typeof owner.repositoriesCount === 'number' && (
                <Statistic
                  value={localize(owner.repositoriesCount, locale)}
                  icon={HiCollection}
                  label={t('repositories-count')}
                />
              )}
            </div>
          </div>
          <div className="sm:col-start-1 sm:col-span-3">
            <div className="grid gap-6">
              <RepositoryPreviewList
                networkStatus={networkStatus}
                called={called}
                loading={loading}
                repositories={owner.repositories.edges.map((edge) => edge.node)}
                onLoadMore={repositoriesLoadMoreHandler}
              />
            </div>
            <p className="py-5 text-secondary text-sm text-center">
              {t('hint', { minStars: localize(MINIMUM_STARS, locale) })}
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default OwnerPage;

export const getServerSideProps: GetServerSideProps<OwnerPageProps> = async ({
  query: { owner },
  locale,
}) => {
  if (typeof owner !== 'string')
    return {
      notFound: true,
    };

  const apolloClient = initializeApollo();

  const {
    data: { ownerByPlatform },
  } = await apolloClient.query<
    GetOwnerQueryResult['data'],
    GetOwnerQueryVariables
  >({
    query: GetOwnerDocument,
    variables: {
      owner,
      platform: PlatformType.GitHub,
    },
  });

  if (!ownerByPlatform)
    return {
      notFound: true,
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      ...(await serverSideTranslations(
        locale,
        ['common', 'owner', 'report'],
        nextI18nextConfig
      )),

      ownerSlug: owner,
    },
  };
};

interface StatisticProps {
  icon: IconType;
  value: string;
  subValue?: string;
  label: string;
}

const Statistic = ({ value, subValue, label, icon: Icon }: StatisticProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
      <Icon className="w-6 h-6 flex-shrink-0" />
      <div className="flex flex-col text-center rtl:sm:text-right ltr:sm:text-left">
        <div className="inline-flex justify-center sm:justify-start items-center gap-2">
          <div className="font-bold">{value}</div>
          {subValue && <div className="text-xs text-secondary">{subValue}</div>}
        </div>
        <div className="text-xs text-secondary">{label}</div>
      </div>
    </div>
  );
};
