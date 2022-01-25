import { NextPage } from 'next';
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
    if (!data.posts.pageInfo.hasNextPage) return;

    fetchMore({
      variables: {
        reposAfter: data.posts.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout>
      <PageHeader
        title="بلاگ"
        description={
          <>
            برای نوشتن پست در بلاگ متن‌باز{' '}
            <a
              className="underline font-bold"
              target="_blank"
              href="https://github.com/matnbaz/blog#readme"
              rel="noreferrer"
            >
              این صفحه
            </a>{' '}
            را مطالعه کنید.
          </>
        }
      />
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <PostPreviewList
          posts={data && data.posts.edges.map((edge) => edge.node)}
        />
      </div>
    </MainLayout>
  );
};

export default BlogPage;
