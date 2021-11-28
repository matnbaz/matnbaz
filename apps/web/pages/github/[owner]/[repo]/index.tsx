import { persianNumbers } from '@iranfoss/common';
import classNames from 'classnames';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import {
  AiOutlineBranches,
  AiOutlineCalendar,
  AiOutlineExclamationCircle,
  AiOutlineFolder,
  AiOutlinePushpin,
  AiOutlineSafetyCertificate,
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
import { formatDistanceToNow } from 'date-fns-jalali';
import Card from 'apps/web/components/UI/Card';
import Button from 'apps/web/components/UI/Button/Button';
import OwnerImage from 'apps/web/components/Owner/OwnerImage';

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
  console.log(repo);

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
      name: 'تاریخ ایجاد',
      icon: AiOutlineCalendar,
      value: persianNumbers(repo.createdAtHumanlyReadable),
    },
    {
      name: 'آخرین به‌روزرسانی',
      icon: AiOutlinePushpin,
      value: persianNumbers(
        formatDistanceToNow(new Date(repo.pushedAt), { addSuffix: true })
      ),
    },
    {
      name: 'لایسنس',
      icon: AiOutlineSafetyCertificate,
      value: repo.license?.name,
    },
  ];

  return (
    <MainLayout maxWidth={false}>
      <div
        className="relative flex items-center h-[38rem] md:h-[24rem] w-full"
        style={{
          // TODO: check if repo as thumbnail otherwise use this
          backgroundImage: `linear-gradient(to right, #009fff, #ec2f4b)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <div className="m-auto flex flex-col items-center bg-gray-100/80 dark:bg-gray-900/90 backdrop-blur-sm w-full h-full px-5 py-2">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 items-center m-auto">
            <OwnerImage owner={repo.owner} width={120} height={120} />
            <div className="flex flex-col space-y-4 items-center md:items-start md:mr-6">
              <a
                className="text-3xl font-bold text-primary-500 dark:text-primary-400"
                href={`https://github.com/${repo.fullName}`}
                target="_blank"
              >
                {repo.fullName}
              </a>
              <span className="text-secondary">{repo.descriptionLimited}</span>
              <span
                className="px-1.5 py-1 rounded-lg text-xs border-2"
                style={{ borderColor: repo.language.color }}
                dir="ltr"
              >
                {repo.language.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0  items-center lg:items-end justify-between w-full px-4 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 lg:flex lg:space-x-12 lg:space-x-reverse items-center">
              {statistics.map(({ name, icon: Icon, value }) =>
                value === null || value === undefined ? null : (
                  <div
                    key={name}
                    className="flex flex-col space-y-3 items-start"
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

            <Button.Red>گزارش</Button.Red>
          </div>
        </div>
      </div>
      <div className="p-8">
        <Card padded>
          {repo.readmeHtml ? (
            <div
              dir="ltr"
              className="prose dark:prose-light overflow-y-auto"
              dangerouslySetInnerHTML={{ __html: repo.readmeHtml }}
            ></div>
          ) : (
            <h1 className="text-lg font-thin text-secondary">
              فایل readme برای نمایش وجود ندارد.
            </h1>
          )}
        </Card>
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
