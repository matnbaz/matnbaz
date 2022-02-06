import { persianNumbers } from '@matnbaz/common';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdChevronRight } from 'react-icons/md';
import { PromotionBanner } from '../../../components/Banner/PromotionBanner';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { RepositoryPreviewList } from '../../../components/Repository/RepositoryPreviewList';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetCollectionDocument,
  GetCollectionQueryResult,
  GetCollectionQueryVariables,
  Locale,
  useGetCollectionQuery,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';

interface CollectionPageProps {
  collectionSlug: string;
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionSlug }) => {
  const { t } = useTranslation('collections');
  const { locale } = useRouter();
  const {
    data: { collection },
    fetchMore,
    loading,
    networkStatus,
    called,
  } = useGetCollectionQuery({
    variables: {
      slug: collectionSlug,
      locale: locale === 'en' ? Locale.Fa : Locale.En,
    },
    notifyOnNetworkStatusChange: true,
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
    <MainLayout withoutFooter>
      <NextSeo
        title={collection.name}
        description={collection.description}
        openGraph={{
          images: [
            {
              url: `https://server.matnbaz.net/collections/${collection.slug}.jpg`,
            },
          ],
        }}
      />
      <div className="max-w-3xl mx-auto">
        <Link href="/collections">
          <a className="inline-flex items-center text-sm text-secondary space-x-2 rtl:space-x-reverse">
            <MdChevronRight />
            <span>{t('all-collections')}</span>
          </a>
        </Link>
        <div className="mt-4 space-y-10">
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
            <div className="text-secondary font-medium text-center">
              {persianNumbers(collection.repositoriesCount)} پروژه
            </div>
            <p className="mt-2 text-center text-secondary text-lg">
              {collection.description}
            </p>
          </div>

          <div className="grid gap-6 pb-6">
            <RepositoryPreviewList
              networkStatus={networkStatus}
              called={called}
              loading={loading}
              repositories={collection.collects.edges.map(
                (collect) => collect.node.repository
              )}
              onLoadMore={repositoriesLoadMoreHandler}
              adsFrequency={7}
              adsTemplate={() => (
                <PromotionBanner className="rounded-xl overflow-hidden" />
              )}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionPage;

export const getServerSideProps: GetServerSideProps<CollectionPageProps> =
  async ({ query: { collection: collectionSlug }, locale }) => {
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
        ...(await serverSideTranslations(
          locale,
          ['common', 'collections'],
          nextI18nextConfig
        )),
        collectionSlug,
      },
    };
  };
