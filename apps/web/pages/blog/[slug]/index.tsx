import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Image from 'next/image';
import { useMemo } from 'react';
import { HiClock, HiUser } from 'react-icons/hi';
import { MainLayout } from '../../../components/Layout/MainLayout';
import { UserPreview } from '../../../components/User/UserPreview';
import { initializeApollo } from '../../../lib/apollo';
import {
  GetPostDocument,
  GetPostQueryResult,
  GetPostQueryVariables,
  useGetPostQuery,
} from '../../../lib/graphql-types';

export interface PostPageProps {
  postSlug: string;
}

const PostPage: NextPage<PostPageProps> = ({ postSlug }) => {
  const { data } = useGetPostQuery({
    variables: { slug: postSlug },
  });

  const post = useMemo(() => data.postBySlug, [data]);

  return (
    <MainLayout withFooterPromo>
      <NextSeo
        title={post.title}
        description={post.summaryLimited}
        openGraph={
          post.image && {
            images: [{ url: post.image, alt: post.title }],
          }
        }
      />

      <div className="max-w-3xl mx-auto ">
        <Image
          width={1280}
          height={640}
          src={post.image}
          className="w-full rounded-lg"
          alt={`عکس پست "${post.title}"`}
        />
        <h1 className="mt-6 text-5xl font-extrabold">{post.title}</h1>
        <div className="mt-6 flex items-center space-x-4 space-x-reverse">
          {post.publishedAt && (
            <div className="inline-flex items-center space-x-1 space-x-reverse text-sm text-secondary">
              <HiClock />
              <span>{post.publishedAt.formatted}</span>
            </div>
          )}
          {post.author && (
            <div className="inline-flex items-center space-x-1 space-x-reverse text-sm text-secondary">
              <HiUser />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>
        {post.tags && (
          <div className="mt-2 space-x-2 space-x-reverse text-sm text-secondary">
            {post.tags.map((tag) => (
              <span className="inline-block" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
        <div
          className="mt-10 prose dark:prose-invert prose-h1:mt-10 prose-h1:font-extrabold prose-h2:font-extrabold"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
        <UserPreview
          padded
          colored
          border="none"
          user={post.author}
          className="mt-12"
        />
      </div>
    </MainLayout>
  );
};

export default PostPage;

export const getServerSideProps: GetServerSideProps<PostPageProps> = async ({
  query: { slug: postSlug },
}) => {
  if (typeof postSlug !== 'string')
    return {
      notFound: true,
    };

  const apolloClient = initializeApollo();

  const {
    data: { postBySlug },
  } = await apolloClient.query<
    GetPostQueryResult['data'],
    GetPostQueryVariables
  >({
    query: GetPostDocument,
    variables: {
      slug: postSlug,
    },
  });

  if (!postBySlug)
    return {
      notFound: true,
    };

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      postSlug,
    },
  };
};
