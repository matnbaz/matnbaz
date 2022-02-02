import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { PostPreviewList } from '../../components/Blog/PostPreviewList';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { useGetPostsQuery } from '../../lib/graphql-types';

const BlogPage: NextPage = () => {
  const { data, fetchMore, loading, networkStatus, called } = useGetPostsQuery({
    variables: {},
    notifyOnNetworkStatusChange: true,
  });

  const postsLoadMoreHandler = () => {
    if (!data?.posts.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        after: data.posts.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title="بلاگ"
        description="معرفی پروژه‌های اپن‌سورس، پست‌های آموزشی، اخبار متن‌باز و..."
      />
      <PageHeader
        title="بلاگ"
        description="معرفی پروژه‌های اپن‌سورس، پست‌های آموزشی، اخبار متن‌باز و..."
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <PostPreviewList
          called={called}
          loading={loading}
          onLoadMore={postsLoadMoreHandler}
          networkStatus={networkStatus}
          posts={data && data.posts.edges.map((edge) => edge.node)}
        />
      </div>
    </MainLayout>
  );
};

export default BlogPage;
