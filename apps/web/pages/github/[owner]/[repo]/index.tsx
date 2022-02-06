import { localize } from '@matnbaz/common';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineExclamationCircle,
  AiOutlineFork,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
} from 'react-icons/ai';
import { PromotionBanner } from '../../../../components/Banner/PromotionBanner';
import { MainLayout } from '../../../../components/Layout/MainLayout';
import { OwnerImage } from '../../../../components/Owner/OwnerImage';
import { RepositoryReport } from '../../../../components/Report/RepositoryReport';
import { RepositoryPreviewList } from '../../../../components/Repository/RepositoryPreviewList';
import { Button } from '../../../../components/UI/Button/Button';
import { Card } from '../../../../components/UI/Card';
import { Expandable } from '../../../../components/UI/Expandable';
import { initializeApollo } from '../../../../lib/apollo';
import {
  GetRepositoryDocument,
  GetRepositoryQueryResult,
  GetRepositoryQueryVariables,
  PlatformType,
  useGetRepositoryQuery,
} from '../../../../lib/graphql-types';
import nextI18nextConfig from '../../../../next-i18next.config';
import { getGradientFromString } from '../../../../utils/gradient-util';
interface RepositoryPageProps {
  repoSlug: string;
  ownerSlug: string;
}
const RepositoryPage: NextPage<RepositoryPageProps> = ({
  ownerSlug,
  repoSlug,
}) => {
  const { t } = useTranslation('repository');
  const {
    data: { repositoryByPlatform: repo },
    loading,
  } = useGetRepositoryQuery({
    variables: {
      owner: ownerSlug,
      repo: repoSlug,
      platform: PlatformType.GitHub,
    },
  });
  const { locale } = useRouter();

  const statistics = [
    {
      name: t('statistics.open-issues-count'),
      icon: AiOutlineExclamationCircle,
      value: localize(+repo.openIssuesCount, locale),
    },
    {
      name: t('statistics.forks-count'),
      icon: AiOutlineFork,
      value: localize(+repo.forksCount, locale),
    },
    {
      name: t('statistics.stargazers-count'),
      icon: AiOutlineStar,
      value: localize(+repo.stargazersCount, locale),
    },
    {
      name: t('statistics.created-at'),
      icon: AiOutlineCalendar,
      value: repo.createdAt.formatted,
    },
    {
      name: t('statistics.pushed-at'),
      icon: AiOutlineClockCircle,
      value: repo.pushedAt.difference,
    },
    {
      name: t('statistics.license'),
      icon: AiOutlineSafetyCertificate,
      value: repo.license?.name,
    },
  ];

  const chosenGradient = useMemo(
    () => getGradientFromString(repo.fullName),
    [repo]
  );

  return (
    <MainLayout maxWidth={false} withoutPadding withFooterPromo>
      <NextSeo
        title={repo.fullName}
        description={repo.descriptionLimited}
        openGraph={{
          images: [
            repo.openGraphImageUrl
              ? {
                  url: repo.openGraphImageUrl,
                  alt: repo.fullName,
                }
              : {
                  url: `https://avatars.githubusercontent.com/u/${repo.owner.platformId}?v=4`,
                  alt: repo.owner.login,
                  height: 420,
                  width: 420,
                },
          ],
        }}
        twitter={{
          cardType: repo.openGraphImageUrl ? 'summary' : 'summary_large_image',
        }}
      />
      <div
        className="relative flex items-center md:h-[30rem] w-full"
        style={{ background: chosenGradient }}
      >
        <div className="px-6 space-y-4 lg:space-y-0 pb-4 pt-24 m-auto flex flex-col items-center bg-gray-300/60 dark:bg-gray-900/75 w-full h-full">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center m-auto">
            <OwnerImage owner={repo.owner} width={120} height={120} />
            <div className="flex flex-col space-y-4 items-center md:items-start ltr:md:ml-6 rtl:md:mr-6">
              <div className="text-center text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400">
                <Link href={`/github/${repo.owner.login}`}>
                  {repo.owner.login}
                </Link>
                <span className="text-secondary"> / </span>
                {/* eslint-disable-next-line react/jsx-no-target-blank */}
                <a
                  href={repo.platformUrl}
                  target="_blank"
                  // TODO make it platform-agnostic
                >
                  {repo.name}
                </a>
              </div>
              <span
                className="text-secondary text-sm md:text-base max-w-[45rem] ltr:text-left rtl:text-right"
                dir={repo.descriptionDirection.toLowerCase()}
              >
                {repo.descriptionLimited}
              </span>
              {repo.language && (
                <span
                  className="px-1.5 py-1 rounded-lg text-xs border-2"
                  style={{ borderColor: repo.language.color?.hexString }}
                  dir="ltr"
                >
                  {repo.language.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0  items-center lg:items-end justify-between w-full px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:flex lg:space-x-8 xl:space-x-10 rtl:lg:space-x-reverse rtl:xl:space-x-reverse items-start">
              {statistics.map(({ name, icon: Icon, value }) =>
                value === null || value === undefined ? null : (
                  <div
                    key={name}
                    className="flex flex-col space-y-3 items-center lg:items-start lg:max-w-[9rem] xl:max-w-none"
                  >
                    <span className="text-xs text-secondary">{name}</span>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-700 dark:text-gray-400 text-xs md:text-base">
                      <Icon className="w-5 h-5 flex-shrink-0" />

                      <span className="font-bold">{value}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center space-x-2 rtl:space-x-reverse flex-shrink-0">
              <Button.Ghost href={repo.platformUrl} target="_blank">
                {t('view-repo')}
              </Button.Ghost>

              <RepositoryReport repository={repo} />
            </div>
          </div>
        </div>
      </div>
      <div className="px-5 mb-5 max-w-7xl mx-auto">
        <PromotionBanner className="mx-auto my-6 rounded-xl overflow-hidden" />
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
          <Card padded border="all" className="col-span-1 lg:col-span-4">
            {repo.readmeHtml ? (
              <Expandable>
                <div
                  dir="ltr"
                  className="prose dark:prose-invert overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
                ></div>
              </Expandable>
            ) : (
              <h1 className="text-lg text-secondary">{t('no-readme-found')}</h1>
            )}
          </Card>

          <div className="flex flex-col space-y-6 col-span-1 lg:col-span-2">
            <h1 className="text-base text-secondary">
              {t('related-projects')}
            </h1>
            {repo.relatedRepos.edges.length > 0 ? (
              <RepositoryPreviewList
                repositories={repo.relatedRepos.edges.map((edge) => edge.node)}
              />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                {t('no-projects-found')}
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RepositoryPage;

export const getServerSideProps: GetServerSideProps<RepositoryPageProps> =
  async ({ query: { owner, repo }, locale }) => {
    if (typeof owner !== 'string' || typeof repo !== 'string')
      return {
        notFound: true,
      };

    const apolloClient = initializeApollo();

    const {
      data: { repositoryByPlatform },
    } = await apolloClient.query<
      GetRepositoryQueryResult['data'],
      GetRepositoryQueryVariables
    >({
      query: GetRepositoryDocument,
      variables: {
        owner,
        repo,
        platform: PlatformType.GitHub,
      },
    });

    if (!repositoryByPlatform)
      return {
        notFound: true,
      };
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        ...(await serverSideTranslations(
          locale,
          ['common', 'repository'],
          nextI18nextConfig
        )),
        repoSlug: repo,
        ownerSlug: owner,
      },
    };
  };
