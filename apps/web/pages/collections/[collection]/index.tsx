import { GetServerSideProps, NextPage } from 'next';
import HeaderMeta from '../../../components/Feature/HeaderMeta';
import MainLayout from '../../../components/Layout/MainLayout';
import RepositoryPreviewList from '../../../components/Repository/RepositoryPreviewList';
import { RandomPromotionBanner } from '../../../components/UI/RandomPromotionBanner';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetCollectionDocument,
  GetCollectionQueryResult,
  GetCollectionQueryVariables,
  useGetCollectionQuery,
} from '../../../lib/graphql-types';

interface CollectionPageProps {
  collectionSlug: string;
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionSlug }) => {
  const {
    data: { collection },
    fetchMore,
    loading,
  } = useGetCollectionQuery({
    variables: { slug: collectionSlug },
  });

  const repositoriesLoadMoreHandler = () => {
    if (!collection.collects.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: collection.collects.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <HeaderMeta
        title={collection.name}
        description={collection.description}
      />

      <div className="space-y-10">
        <div className="">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={collection.image}
            alt={collection.name}
            className="brightness-0 dark:invert w-24 h-24 mx-auto"
          />
          <h1
            className="mt-4 text-center text-2xl sm:text-4xl font-bold truncate"
            dir="ltr"
          >
            {collection.name}
          </h1>
          <p className="mt-2 text-center text-secondary text-lg">
            {collection.description}
          </p>
        </div>

        <div className="grid gap-6 pb-6 max-w-3xl mx-auto">
          <RepositoryPreviewList
            loading={loading}
            repositories={collection.collects.edges.map(
              ({ node: { repository } }) => ({ node: repository })
            )}
            onLoadMore={repositoriesLoadMoreHandler}
            adsFrequency={7}
            adsTemplate={() => (
              <RandomPromotionBanner className="rounded-xl overflow-hidden" />
            )}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps<CollectionPageProps> =
  async ({ query: { collection: collectionSlug }, res }) => {
    if (typeof collectionSlug !== 'string')
      return {
        notFound: true,
      };

    const apolloClient = initializeApollo();

    const {
      data: { collection },
    } = await apolloClient.query<
      GetCollectionQueryResult['data'],
      GetCollectionQueryVariables
    >({
      query: GetCollectionDocument,
      variables: {
        slug: collectionSlug,
      },
    });

    if (!collection)
      return {
        notFound: true,
      };

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        collectionSlug,
      },
    };
  };
