import { GetStaticProps, NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { initializeApollo } from '../../lib/apollo';
import {
  GetCollectionsDocument,
  GetCollectionsQueryResult,
  GetCollectionsQueryVariables,
} from '../../lib/graphql-types';
import nextI18nextConfig from '../../next-i18next.config';
import { localeToEnum } from '../../utils/locale';

export interface CollectionsPageProps {
  collections: GetCollectionsQueryResult['data']['collections'];
}

const CollectionsPage: NextPage<CollectionsPageProps> = ({ collections }) => {
  const { t } = useTranslation('collections');

  let template;
  if (collections.edges.length === 0)
    template = <p className="text-center font-bold">{t('no-result-found')}</p>;
  else
    template = (
      <div className="mb-12 grid gap-10 md:grid-cols-12">
        {collections.edges.map(({ node }, index) => (
          <CollectionPreview
            bgColor="standout"
            className="md:col-span-4 lg:col-span-3"
            key={node.id}
            collection={node}
            border="none"
          />
        ))}
      </div>
    );
  return (
    <MainLayout withFooterPromo>
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} description={t('page-description')} />
      {template}
    </MainLayout>
  );
};

export default CollectionsPage;

export const getStaticProps: GetStaticProps<CollectionsPageProps> = async ({
  locale,
}) => {
  const apolloClient = initializeApollo();

  const {
    data: { collections },
  } = await apolloClient.query<
    GetCollectionsQueryResult['data'],
    GetCollectionsQueryVariables
  >({
    query: GetCollectionsDocument,
    variables: {
      locale: localeToEnum(locale),
    },
  });

  return {
    revalidate: 60 * 60 * 12, // 12H
    props: {
      collections,
      ...(await serverSideTranslations(
        locale,
        ['common', 'collections'],
        nextI18nextConfig
      )),
    },
  };
};
