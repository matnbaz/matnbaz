import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { CollectionPreviewSkeletonLoader } from '../../components/SkeletonLoader/CollectionPreviewSkeletonLoader';
import { Locale, useGetCollectionsQuery } from '../../lib/graphql-types';
import nextI18nextConfig from '../../next-i18next.config';

const CollectionsPage: NextPage = () => {
  const { t } = useTranslation('collections');
  const { locale } = useRouter();
  const { data, fetchMore, loading } = useGetCollectionsQuery({
    variables: { locale: locale === 'en' ? Locale.En : Locale.Fa },
  });
  //   const collectionsLoadMoreHandler = () => {
  //     if (!collections.pageInfo.hasNextPage) return;

  //     fetchMore({
  //       variables: {
  //         reposAfter: collections.pageInfo.endCursor,
  //       },
  //     });
  //   };
  let template;
  if (!loading && !data)
    template = <p className="text-center font-bold">{t('no-result-found')}</p>;
  else
    template = (
      <div className="mb-12 grid gap-10 md:grid-cols-12">
        {loading ? (
          <>
            {Array.from(Array(16).keys()).map((i) => (
              <CollectionPreviewSkeletonLoader
                bgColor="standout"
                className="md:col-span-4 lg:col-span-3"
                key={i}
                border="none"
              />
            ))}
          </>
        ) : (
          data.collections.edges.map(({ node }, index) => (
            <CollectionPreview
              bgColor="standout"
              className="md:col-span-4 lg:col-span-3"
              key={node.id}
              collection={node}
              border="none"
            />
          ))
        )}
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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'collections'],
        nextI18nextConfig
      )),
    },
  };
}
