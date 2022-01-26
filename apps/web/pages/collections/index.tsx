import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { CollectionPreviewSkeletonLoader } from '../../components/SkeletonLoader/CollectionPreviewSkeletonLoader';
import { useGetCollectionsQuery } from '../../lib/graphql-types';

const CollectionsPage: NextPage = () => {
  const { data, fetchMore, loading } = useGetCollectionsQuery({});
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
    template = <p className="text-center font-bold">هیچ کالکشنی یافت نشد.</p>;
  else
    template = (
      <div className="mb-12 grid gap-10 md:grid-cols-12">
        {loading ? (
          <>
            {Array.from(Array(16).keys()).map((i) => (
              <CollectionPreviewSkeletonLoader
                className="md:col-span-4 lg:col-span-3"
                key={i}
                border="none"
                colored
              />
            ))}
          </>
        ) : (
          data.collections.edges.map(({ node }, index) => (
            <CollectionPreview
              className="md:col-span-4 lg:col-span-3"
              key={node.id}
              collection={node}
              border="none"
              colored
            />
          ))
        )}
      </div>
    );
  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="کالکشن‌ها"
        description="کالکشن های مختلف از پروژه های اوپن سورس ایرانی"
      />

      <PageHeader
        title="کالکشن‌ها"
        description="کالکشن‌ها به شما کمک می‌کنند پروژه‌های مربوط به حوزه و تکنولوژی دلخواه خود را راحت‌تر و سریع‌تر پیدا کنید."
      />
      {template}
    </MainLayout>
  );
};

export default CollectionsPage;
