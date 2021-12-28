import HeaderMeta from '../../components/Feature/HeaderMeta';
import MainLayout from '../../components/Layout/MainLayout';
import SkeletonLoaderShape from '../../components/Skeleton Loader/SkeletonLoaderShape';
import Card from '../../components/UI/Card';
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
      <div className="px-6 space-y-6">
        <div className="flex items-center gap-10 flex-wrap justify-center">
          {loading ? (
            <SkeletonLoaderShape shape="rectangle" width="20px" height="20px" />
          ) : (
            data.collections.edges.map(
              ({ node: { name, slug, repositoriesCount } }) => (
                <Card
                  key={slug}
                  border="none"
                  padded
                  style={{ backgroundColor: 'transparent' }}
                  className="text-white w-40 hover:scale-110 transition"
                  href={`/collections/${slug}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt={name}
                    src={`https://simpleicons.org/icons/${
                      // Temporary fix for "Vue.js" and "Node.js"
                      name.includes('.')
                        ? name.replace(/\./g, 'dot').toLowerCase()
                        : slug
                    }.svg`}
                    className="w-14 h-14 mx-auto brightness-0 invert"
                  />
                  <div dir="ltr" className="text-center font-medium mt-4">
                    {name}
                  </div>
                </Card>
              )
            )
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default CollectionsPage;
