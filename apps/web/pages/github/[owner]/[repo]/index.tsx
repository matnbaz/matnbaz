import { persianNumbers } from '@iranfoss/common';
import { GetServerSideProps } from 'next';
import {
  AiOutlineBranches,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineExclamationCircle,
  AiOutlineSafetyCertificate,
  AiOutlineStar,
} from 'react-icons/ai';
import MainLayout from '../../../../components/Layout/MainLayout';
import OwnerImage from '../../../../components/Owner/OwnerImage';
import RepositoryPreviewList from '../../../../components/Repository/RepositoryPreviewList';
import Button from '../../../../components/UI/Button/Button';
import Card from '../../../../components/UI/Card';
import Expandable from '../../../../components/UI/Expandable';
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

  return (
    <MainLayout maxWidth={false} withoutPadding>
      <div className="relative flex items-center h-[40rem] md:h-[30rem] w-full bg-gradient-to-bl from-green-500 to-yellow-400">
        <div className="px-6 pb-4 pt-24 m-auto flex flex-col items-center bg-gray-100/75 dark:bg-gray-900/75 w-full h-full">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center m-auto">
            <OwnerImage owner={repo.owner} width={120} height={120} />
            <div className="flex flex-col space-y-4 items-center md:items-start md:mr-6">
              <a
                className="text-2xl md:text-3xl font-bold text-primary-500 dark:text-primary-400"
                href={repo.platformUrl}
                target="_blank"
                rel="noreferrer"
              >
                {repo.fullName}
              </a>
              <span className="text-secondary text-sm md:text-base">
                {repo.descriptionLimited}
              </span>
              {repo.language && (
                <span
                  className="px-1.5 py-1 rounded-lg text-xs border-2"
                  style={{ borderColor: repo.language.color }}
                  dir="ltr"
                >
                  {repo.language.name}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0  items-center lg:items-end justify-between w-full px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:flex lg:space-x-12 lg:space-x-reverse items-center">
              {statistics.map(({ name, icon: Icon, value }) =>
                value === null || value === undefined ? null : (
                  <div
                    key={name}
                    className="flex flex-col space-y-3 items-center lg:items-start"
                  >
                    <span className="text-xs text-secondary">{name}</span>
                    <div className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400 text-xs md:text-base">
                      <Icon className="w-5 h-5" />

                      <span className="font-bold">{value}</span>
                    </div>
                  </div>
                )
              )}
            </div>

            <div className="flex items-center space-x-2 space-x-reverse">
              <Button.Ghost href={repo.platformUrl} target="_blank">
                مشاهده مخزن
              </Button.Ghost>

              <Button.Ghost>گزارش</Button.Ghost>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 sm:p-8">
        <div className="grid grid-cols-1 gap-6 max-w-7xl mx-auto">
          <Card padded border="desktop">
            {repo.readmeHtml ? (
              <Expandable>
                <div
                  dir="ltr"
                  className="prose dark:prose-light overflow-y-auto"
                  dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
                ></div>
              </Expandable>
            ) : (
              <h1 className="text-lg font-thin text-secondary">
                فایل readme برای نمایش وجود ندارد.
              </h1>
            )}
          </Card>

          <div className="flex flex-col space-y-6">
            <h1 className="text-xl font-bold">پروژه‌های مشابه:</h1>
            {repo.relatedRepos.edges.length > 0 ? (
              <RepositoryPreviewList repositories={repo.relatedRepos.edges} />
            ) : (
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                پروژه ای یافت نشد.
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

//   <div className="space-y-10">
//   <div
//     className="mx-10 flex justify-center space-x-8 items-center"
//     dir="ltr"
//   >
//     <Image
//       width={100}
//       height={100}
//       src={`https://avatars.githubusercontent.com/u/${repo.owner.platformId}?v=4`}
//       alt={`عکس ${repo.owner.login}`}
//       className={`w-16 h-16 ${
//         repo.owner.type === 'User' ? 'rounded-full' : 'rounded-lg'
//       }`}
//     />
//     <h1 className="font-bold text-5xl">{repo.fullName}</h1>
//   </div>

//   <div className="grid grid-cols-1 md:grid-cols-8 pt-4 px-6 pb-6 gap-6">
//     <div className="md:col-span-3 lg:col-span-2">
//       <div className="space-y-1">
//         {statistics.map(({ name, icon: Icon, value }) => (
//           <div
//             key={name}
//             className="flex items-center space-x-2 space-x-reverse text-gray-700 dark:text-gray-400 text-lg"
//           >
//             <Icon className="w-6 h-6" />
//             <span>{name}:</span>
//             <span className="font-bold">{value}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//     <div className="md:col-span-5 lg:col-span-6">
//       {repo.readmeHtml && (
//         <div
//           className="prose dark:prose-light"
//           dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
//         ></div>
//       )}
//     </div>
//   </div>
// </div>
