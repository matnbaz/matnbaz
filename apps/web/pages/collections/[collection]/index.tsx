import { GetServerSideProps, NextPage } from 'next';
import HeaderMeta from '../../../components/Feature/HeaderMeta';
import MainLayout from '../../../components/Layout/MainLayout';
import RepositoryPreviewList from '../../../components/Repository/RepositoryPreviewList';
import Divider from '../../../components/UI/Divider';
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
    if (!collection.repositories.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: collection.repositories.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <HeaderMeta
        title={collection.name}
        description={collection.description}
      />
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center justify-between overflow-hidden">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 items-center sm:space-x-4 sm:space-x-reverse">
            <div className="flex-shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={collection.image}
                alt={collection.name}
                className="brightness-0 invert w-20 h-20"
              />
            </div>

            <div className="flex flex-col ">
              <h1 className="text-2xl sm:text-4xl font-bold truncate">
                {collection.name}
              </h1>
              <span className="text-secondary text-lg">
                {collection.description}
              </span>
            </div>
          </div>
        </div>
        <Divider />
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 md:col-span-5 lg:col-span-6 auto-rows-min pb-6">
          <RepositoryPreviewList
            loading={loading}
            repositories={collection.repositories.edges}
            onLoadMore={repositoriesLoadMoreHandler}
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
        notfound: true,
        props: { collectionSlug: '' },
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
        notfound: true,
        props: { collectionSlug },
      };

    return {
      props: {
        initialApolloState: apolloClient.cache.extract(),
        collectionSlug,
      },
    };
  };
