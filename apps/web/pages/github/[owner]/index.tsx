import { persianNumbers } from '@iranfoss/common';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import MainLayout from '../../../components/Layouts/MainLayout';
import OwnerReport from '../../../components/Reports/OwnerReport';
import RepositoryPreviewList from '../../../components/Repository/RepositoryPreviewList';
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
      <div className="px-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Image
              width={130}
              height={130}
              src={`https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`}
              alt={owner.login}
              className="rounded-xl"
            />
            <div className="flex flex-col space-y-3">
              <h1 className="text-2xl font-bold">{owner.login}</h1>
              <span className="text-secondary text-lg font-extralight">
                {persianNumbers(owner.repositoriesCount)} پروژه
              </span>
            </div>
          </div>
          <OwnerReport owner={owner} />
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:col-span-5 lg:col-span-6 auto-rows-min pb-6">
          <RepositoryPreviewList
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
