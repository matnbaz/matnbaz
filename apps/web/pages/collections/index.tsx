import { NextSeo } from 'next-seo';
import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import MainLayout from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import CollectionPreviewSkeletonLoader from '../../components/Skeleton Loader/CollectionPreviewSkeletonLoader';
import { useGetCollectionsQuery } from '../../lib/graphql-types';

const CollectionsPage = () => {
  const { data, fetchMore, loading } = useGetCollectionsQuery({});
  //   const collectionsLoadMoreHandler = () => {
  //     if (!collections.pageInfo.hasNextPage) return;

  //     fetchMore({
  //       variables: {
  //         reposAfter: collections.pageInfo.endCursor,
  //       },
  //     });
  //   };

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="کالکشن‌ها"
        description="کالکشن های مختلف از پروژه های اوپن سورس ایرانی"
      />

      <PageHeader title="کالکشن‌ها" />

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
    </MainLayout>
  );
};

export default CollectionsPage;
