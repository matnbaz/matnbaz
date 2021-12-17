import { persianNumbers } from '@matnbaz/common';
import { GetServerSideProps } from 'next';
import HeaderMeta from '../../../components/Feature/HeaderMeta';
import MainLayout from '../../../components/Layout/MainLayout';
import OwnerImage from '../../../components/Owner/OwnerImage';
import OwnerReport from '../../../components/Report/OwnerReport';
import RepositoryPreviewList from '../../../components/Repository/RepositoryPreviewList';
import Button from '../../../components/UI/Button/Button';
import Divider from '../../../components/UI/Divider';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetOwnerDocument,
  GetOwnerQueryResult,
  GetOwnerQueryVariables,
  PlatformType,
  useGetOwnerQuery,
} from '../../../lib/graphql-types';
interface OwnerPageProps {
  ownerSlug: string;
}

const OwnerPage = ({ ownerSlug }) => {
  const {
    data: { ownerByPlatform: owner },
    fetchMore,
    loading,
  } = useGetOwnerQuery({
    variables: { owner: ownerSlug, platform: PlatformType.GitHub },
  });
  const repositoriesLoadMoreHandler = () => {
    if (!owner.repositories.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: owner.repositories.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <HeaderMeta
        title={owner.login}
        description={`پروفایل ${owner.login} از پلتفرم ${owner.platform}`}
      />
      <div className="px-6 space-y-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-between overflow-hidden">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="flex-shrink-0">
              <OwnerImage owner={owner} />
            </div>

            <div className="flex flex-col ">
              <h1 className="text-xl sm:text-2xl font-bold truncate">
                {owner.login} gamwewereee
              </h1>
              <span className="text-secondary text-lg font-extralight">
                {persianNumbers(owner.repositoriesCount)} پروژه
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button.Ghost
              href={`https://github.com/${owner.login}`}
              target="_blank"
            >
              {/* TODO: Change based on platform */}
              مشاهده صفحه
            </Button.Ghost>
            <OwnerReport owner={owner} />
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:col-span-5 lg:col-span-6 auto-rows-min pb-6">
          <RepositoryPreviewList
            loading={loading}
            repositories={owner.repositories.edges}
            onLoadMore={repositoriesLoadMoreHandler}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default OwnerPage;

export const getServerSideProps: GetServerSideProps<OwnerPageProps> = async ({
  query: { owner },
  res,
}) => {
  if (typeof owner !== 'string')
    return {
      redirect: { permanent: false, destination: '/' },
      props: { ownerSlug: '' },
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
      redirect: { permanent: false, destination: '/' },
      props: { ownerSlug: owner },
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      ownerSlug: owner,
    },
  };
};
