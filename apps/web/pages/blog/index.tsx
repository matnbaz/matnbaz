import { NextPage } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { PostPreviewList } from '../../components/Blog/PostPreviewList';
import { MainLayout } from '../../components/Layout/MainLayout';
import { PageHeader } from '../../components/Layout/PageHeader';
import { useGetPostsQuery } from '../../lib/graphql-types';
import nextI18nextConfig from '../../next-i18next.config';

const BlogPage: NextPage = () => {
  const { t } = useTranslation('blog');
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
      <NextSeo title={t('page-title')} description={t('page-description')} />
      <PageHeader title={t('page-title')} description={t('page-description')} />

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

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ['common', 'blog'],
        nextI18nextConfig
      )),
    },
  };
}
