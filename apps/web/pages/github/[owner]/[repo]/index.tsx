import { persianNumbers } from '@matnbaz/common';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useMemo } from 'react';
import {
  AiOutlineBranches,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineExclamationCircle,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
} from 'react-icons/ai';
import HeaderMeta from '../../../../components/Feature/HeaderMeta';
import MainLayout from '../../../../components/Layout/MainLayout';
import OwnerImage from '../../../../components/Owner/OwnerImage';
import RepositoryReport from '../../../../components/Report/RepositoryReport';
import RepositoryPreviewList from '../../../../components/Repository/RepositoryPreviewList';
import Button from '../../../../components/UI/Button/Button';
import Card from '../../../../components/UI/Card';
import Expandable from '../../../../components/UI/Expandable';
import { RandomPromotionBanner } from '../../../../components/UI/RandomPromotionBanner';
import { initializeApollo } from '../../../../lib/apollo';
import {
  GetRepositoryDocument,
  GetRepositoryQueryResult,
  GetRepositoryQueryVariables,
  PlatformType,
  useGetRepositoryQuery,
} from '../../../../lib/graphql-types';
import { getGradientFromString } from '../../../../utils/gradient-util';
interface RepositoryPageProps {
  repoSlug: string;
  ownerSlug: string;
}
const RepositoryPage = ({ ownerSlug, repoSlug }: RepositoryPageProps) => {
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

  const statistics = [
    {
      name: 'موضوع‌ها',
      icon: AiOutlineExclamationCircle,
      value: persianNumbers(+repo.openIssuesCount),
    },
    {
      name: 'فورک‌ها',
      icon: AiOutlineBranches,
      value: persianNumbers(+repo.forksCount),
    },
    {
      name: 'ستاره‌ها',
      icon: AiOutlineStar,
      value: persianNumbers(+repo.stargazersCount),
    },
    {
      name: 'تاریخ ایجاد',
      icon: AiOutlineCalendar,
      value: repo.createdAt.formatted,
    },
    {
      name: 'آخرین به‌روزرسانی',
      icon: AiOutlineClockCircle,
      value: repo.pushedAt.difference,
    },
    {
      name: 'لایسنس',
      icon: AiOutlineSafetyCertificate,
      value: repo.license?.name,
    },
  ];

  const chosenGradient = useMemo(
    () => getGradientFromString(repo.fullName),
    [repo]
  );

  return (
    <MainLayout maxWidth={false} withoutPadding>
      <HeaderMeta title={repo.fullName} description={repo.descriptionLimited} />
      <div
        className="relative flex items-center md:h-[30rem] w-full"
        style={{ background: chosenGradient }}
      >
        <div className="px-6 space-y-4 lg:space-y-0 pb-4 pt-24 m-auto flex flex-col items-center bg-gray-300/60 dark:bg-gray-900/75 w-full h-full">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center m-auto">
            <OwnerImage owner={repo.owner} width={120} height={120} />
            <div className="flex flex-col space-y-4 items-center md:items-start md:mr-6">
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
                className="text-secondary text-sm md:text-base max-w-[45rem] text-right"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:flex lg:space-x-8 xl:space-x-10 lg:space-x-reverse xl:space-x-reverse items-start">
              {statistics.map(({ name, icon: Icon, value }) =>
                value === null || value === undefined ? null : (
                  <div
                    key={name}
                    className="flex flex-col space-y-3 items-center lg:items-start lg:max-w-[9rem] xl:max-w-none"
                  >
                    <span className="text-xs text-secondary">{name}</span>
                    <div className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400 text-xs md:text-base">
                      <Icon className="w-5 h-5 flex-shrink-0" />

                      <span className="font-bold">{value}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center space-x-2 space-x-reverse flex-shrink-0">
              <Button.Ghost href={repo.platformUrl} target="_blank">
                مشاهده مخزن
              </Button.Ghost>

              <RepositoryReport repository={repo} />
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6 items-start">
          <Card padded border="all" className="col-span-1 lg:col-span-4">
            {repo.readmeHtml ? (
              <Expandable>
                <div
                  dir={repo.readmeDirection.toLowerCase()}
                  className="prose dark:prose-invert overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
                ></div>
              </Expandable>
            ) : (
              <h1 className="text-lg font-thin text-secondary">
                فایل readme برای نمایش وجود ندارد.
              </h1>
            )}
          </Card>

          <div className="flex flex-col space-y-6 col-span-1 lg:col-span-2">
            <h1 className="text-base text-secondary">پروژه‌های مشابه</h1>
            {repo.relatedRepos.edges.length > 0 ? (
              <RepositoryPreviewList repositories={repo.relatedRepos.edges} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                پروژه ای یافت نشد.
              </div>
            )}
          </div>
        </div>

        <RandomPromotionBanner className="my-6 rounded-xl overflow-hidden" />
      </div>
    </MainLayout>
  );
};

export default RepositoryPage;

export const getServerSideProps: GetServerSideProps<RepositoryPageProps> =
  async ({ query: { owner, repo }, res }) => {
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
        repoSlug: repo,
        ownerSlug: owner,
      },
    };
  };
