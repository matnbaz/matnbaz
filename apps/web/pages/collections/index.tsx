import { CollectionPreview } from '../../components/Collection/CollectionPreview';
import HeaderMeta from '../../components/Feature/HeaderMeta';
import MainLayout from '../../components/Layout/MainLayout';
import SkeletonLoaderShape from '../../components/Skeleton Loader/SkeletonLoaderShape';
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
        <h1 className="text-4xl font-bold text-center">کالکشن ها</h1>
      </div>
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        {loading ? (
          <SkeletonLoaderShape shape="rectangle" width="20px" height="20px" />
        ) : (
          data.collections.edges.map(({ node }, index) => (
            <CollectionPreview
              isBig
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
