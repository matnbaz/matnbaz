import { localize } from '@matnbaz/common';
import { GetServerSideProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdChevronLeft } from 'react-icons/md';
import { PromotionBanner } from '../../../components/Banner/PromotionBanner';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { RepositoryPreviewList } from '../../../components/Repository/RepositoryPreviewList';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetCollectionDocument,
  GetCollectionQueryResult,
  GetCollectionQueryVariables,
  useGetCollectionQuery,
} from '../../../lib/graphql-types';
import nextI18nextConfig from '../../../next-i18next.config';
import { localeToEnum } from '../../../utils/locale';

interface CollectionPageProps {
  collectionSlug: string;
}

const CollectionPage: NextPage<CollectionPageProps> = ({ collectionSlug }) => {
  const { t } = useTranslation('collections');
  const { locale } = useRouter();
  const { data, fetchMore, loading, networkStatus, called } =
    useGetCollectionQuery({
      variables: {
        slug: collectionSlug,
        locale: localeToEnum(locale),
      },
      notifyOnNetworkStatusChange: true,
    });

  const repositoriesLoadMoreHandler = () => {
    if (!data?.collection.collects.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: data?.collection.collects.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withoutFooter>
      <NextSeo
        title={data?.collection.name}
        description={data?.collection.description}
        openGraph={{
          images: [
            {
              url: `https://server.matnbaz.net/collections/${data?.collection.slug}.jpg`,
            },
          ],
        }}
      />
      <div className="max-w-3xl mx-auto">
        <Link href="/collections">
          <a className="inline-flex items-center text-sm text-secondary space-x-2 rtl:space-x-reverse">
            <MdChevronLeft className="rtl:rotate-180" />
            <span>{t('all-collections')}</span>
          </a>
        </Link>
        <div className="mt-4 space-y-10">
          <div className="">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data?.collection.image}
              alt={data?.collection.name}
              className="brightness-0 dark:invert w-24 h-24 mx-auto"
            />
            <h1
              className="mt-4 text-center text-2xl sm:text-4xl font-bold truncate"
              dir="ltr"
            >
              {data?.collection.name}
            </h1>
            <div className="text-secondary font-medium text-center">
              {t('repositories-count', {
                repositoriesCount: localize(
                  data?.collection.repositoriesCount,
                  locale
                ),
              })}
            </div>
            <p className="mt-2 text-center text-secondary text-lg">
              {data?.collection.description}
            </p>
          </div>

          <div className="grid gap-6 pb-6">
            <RepositoryPreviewList
              networkStatus={networkStatus}
              called={called}
              loading={loading}
              repositories={data?.collection.collects.edges.map(
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
        locale: localeToEnum(locale),
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
