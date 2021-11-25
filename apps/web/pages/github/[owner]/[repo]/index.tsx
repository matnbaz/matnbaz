import { persianNumbers } from '@iranfoss/common';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import {
  AiOutlineBranches,
  AiOutlineCalendar,
  AiOutlineExclamationCircle,
  AiOutlineFolder,
  AiOutlinePushpin,
  AiOutlineStar,
} from 'react-icons/ai';
import MainLayout from '../../../../components/Layouts/MainLayout';
import { initializeApollo } from '../../../../lib/apollo';
import {
  GetRepositoryDocument,
  GetRepositoryQueryResult,
  GetRepositoryQueryVariables,
  PlatformType,
  useGetRepositoryQuery,
} from '../../../../lib/graphql-types';

interface RepositoryPageProps {
  repoSlug: string;
  ownerSlug: string;
}

const RepositoryPage = ({ ownerSlug, repoSlug }: RepositoryPageProps) => {
  const {
    data: { repositoryByPlatform: repo },
  } = useGetRepositoryQuery({
    variables: {
      owner: ownerSlug,
      repo: repoSlug,
      platform: PlatformType.GitHub,
    },
  });

  const statistics = [
    {
      name: 'تعداد مشکلات',
      icon: AiOutlineExclamationCircle,
      value: persianNumbers(+repo.openIssuesCount),
    },
    {
      name: 'فورک ها',
      icon: AiOutlineBranches,
      value: persianNumbers(+repo.forksCount),
    },
    {
      name: 'ستاره ها',
      icon: AiOutlineStar,
      value: persianNumbers(+repo.stargazersCount),
    },
    {
      name: 'آخرین پوش',
      icon: AiOutlinePushpin,
      value: persianNumbers(repo.pushedAtHumanlyReadable),
    },
    {
      name: 'تاریخ ایجاد',
      icon: AiOutlineCalendar,
      value: persianNumbers(repo.createdAtHumanlyReadable),
    },
    {
      name: 'لایسنس',
      icon: AiOutlineFolder,
      value: persianNumbers(repo.license.name),
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-10">
        <div
          className="mx-10 flex justify-center space-x-8 items-center"
          dir="ltr"
        >
          <Image
            width={100}
            height={100}
            src={`https://avatars.githubusercontent.com/u/${repo.owner.platformId}?v=4`}
            alt={`عکس ${repo.owner.login}`}
            className={`w-16 h-16 ${
              repo.owner.type === 'User' ? 'rounded-full' : 'rounded-lg'
            }`}
          />
          <h1 className="font-bold text-5xl">{repo.fullName}</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 pt-4 px-6 pb-6 gap-6">
          <div className="md:col-span-3 lg:col-span-2">
            <div className="space-y-1">
              {statistics.map(({ name, icon: Icon, value }) => (
                <div
                  key={name}
                  className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400 text-lg"
                >
                  <Icon className="w-6 h-6" />
                  <span>{name}:</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-5 lg:col-span-6">
            {repo.readmeHtml && (
              <div
                className="prose dark:prose-light"
                dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default RepositoryPage;

export const getServerSideProps: GetServerSideProps<RepositoryPageProps> =
  async ({ query: { owner, repo }, res }) => {
    if (typeof owner !== 'string' || typeof repo !== 'string')
      return {
        redirect: { permanent: false, destination: '/' },
        props: { ownerSlug: '', repoSlug: '' },
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
        redirect: { permanent: false, destination: '/' },
        props: { ownerSlug: '', repoSlug: '' },
      };
    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        repoSlug: repo,
        ownerSlug: owner,
      },
    };
  };
