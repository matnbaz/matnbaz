import { persianNumbers } from '@matnbaz/common';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { OwnerImage } from '../../../components/Owner/OwnerImage';
import { OwnerReport } from '../../../components/Report/OwnerReport';
import { RepositoryPreviewList } from '../../../components/Repository/RepositoryPreviewList';
import { Button } from '../../../components/UI/Button/Button';
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

const OwnerPage: NextPage<OwnerPageProps> = ({ ownerSlug }) => {
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
  const repositoriesLoadMoreHandler = () => {
    if (!owner.repositories.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: owner.repositories.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withoutFooter>
      <NextSeo
        title={owner.login}
        description={`پروفایل ${owner.login} از پلتفرم ${owner.platform}`}
        openGraph={{
          images: [
            {
              url: `https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`,
              alt: owner.login,
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
          <h1 className="mt-4 text-xl sm:text-2xl font-bold truncate text-center ">
            {owner.login}
          </h1>
          <div className="mt-2 text-center text-secondary text-lg">
            {persianNumbers(owner.repositoriesCount)} پروژه
          </div>

          <div className="mt-4 flex justify-center items-center space-x-2 space-x-reverse">
            <Button.Ghost
              href={`https://github.com/${owner.login}`}
              target="_blank"
            >
              {/* TODO: Change based on platform */}
              صفحه گیت‌هاب
            </Button.Ghost>
            <OwnerReport owner={owner} />
          </div>
        </div>

        <div className="grid gap-6 pb-6 max-w-3xl mx-auto">
          <RepositoryPreviewList
            networkStatus={networkStatus}
            called={called}
            loading={loading}
            repositories={owner.repositories.edges.map((edge) => edge.node)}
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
      ownerSlug: owner,
    },
  };
};
