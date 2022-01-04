import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import HeaderMeta from '../../components/Feature/HeaderMeta';
import MainLayout from '../../components/Layout/MainLayout';
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
    <MainLayout>
      <HeaderMeta
        title="کالکشن‌ها"
        description="کالکشن های مختلف از پروژه های اوپن سورس ایرانی / فارسی"
      />

      <div>
        <h1 className="text-4xl font-bold text-center">کالکشن‌ها</h1>
      </div>
      <div className="my-12 grid gap-10 md:grid-cols-12">
        {loading ? (
          <>
            {Array.from(Array(6).keys()).map((i) => (
              <CollectionPreviewSkeletonLoader
                key={i}
                variation="big"
                className="md:col-span-6 lg:col-span-4"
              />
            ))}
            {Array.from(Array(8).keys()).map((i) => (
              <CollectionPreviewSkeletonLoader
                key={i}
                className="md:col-span-4 lg:col-span-3"
              />
            ))}
          </>
        ) : (
          data.collections.edges.map(({ node }, index) => (
            <CollectionPreview
              variation="big"
              className={
                index < 6
                  ? 'md:col-span-6 lg:col-span-4'
                  : 'md:col-span-4 lg:col-span-3'
              }
              key={node.id}
              collection={node}
            />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default CollectionsPage;
