import { GetServerSideProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { PostPreviewList } from '../../../../components/Blog/PostPreviewList';
import { MainLayout } from '../../../../components/Layout/MainLayout';
import { PageHeader } from '../../../../components/Layout/PageHeader';
import { initializeApollo } from '../../../../lib/apollo';
import {
  GetTagDocument,
  GetTagQueryResult,
  GetTagQueryVariables,
  useGetTagQuery,
} from '../../../../lib/graphql-types';
import nextI18nextConfig from '../../../../next-i18next.config';
import { calendarFromLocale, localeToEnum } from '../../../../utils/locale';

export interface TagPageProps {
  tagName: string;
}

const TagPage: NextPage<TagPageProps> = ({ tagName }) => {
  const { locale } = useRouter();
  const { data, called, loading, networkStatus, fetchMore } = useGetTagQuery({
    variables: {
      name: tagName,
      locale: localeToEnum(locale),
      calendar: calendarFromLocale(locale),
    },
  });

  const postsLoadMoreHandler = () => {
    if (!data?.tag.posts.pageInfo.hasNextPage) return;
    console.log(data.tag.posts.pageInfo.endCursor);
    fetchMore({
      variables: {
        postsAfter: data.tag.posts.pageInfo.endCursor,
      },
    });
  };

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title={data?.tag.name}
        description={`تمام پست‌ها با برچسب "${data?.tag.name}"`}
      />
      <PageHeader title={`#${data?.tag.name}`} />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <PostPreviewList
          called={called}
          loading={loading}
          onLoadMore={postsLoadMoreHandler}
          networkStatus={networkStatus}
          posts={data && data.tag.posts.edges.map((edge) => edge.node)}
        />
      </div>
    </MainLayout>
  );
};

export default TagPage;

export const getServerSideProps: GetServerSideProps<TagPageProps> = async ({
  query: { tag },
  locale,
}) => {
  if (typeof tag !== 'string')
    return {
      notFound: true,
    };

  const apolloClient = initializeApollo();

  const {
    data: { tag: tagObject },
  } = await apolloClient.query<GetTagQueryResult['data'], GetTagQueryVariables>(
    {
      query: GetTagDocument,
      variables: {
        name: tag,
      },
    }
  );

  if (!tagObject)
    return {
      notFound: true,
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      ...(await serverSideTranslations(locale, ['common'], nextI18nextConfig)),
      tagName: tag,
    },
  };
};
