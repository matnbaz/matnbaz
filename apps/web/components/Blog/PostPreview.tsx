import Image from 'next/image';
import { HiClock, HiUser } from 'react-icons/hi';
import { Card, CardProps } from '../UI/Card';

export interface PostPreviewProps extends Omit<CardProps, 'children'> {
  post: {
    id: string;
    slug: string;
    title: string;
    image?: string;
    tags?: { name: string }[];
    summary?: string;
    summaryLimited?: string;
    publishedAt?: {
      formatted: string;
      difference: string;
    };
    author: {
      id: string;
      username: string;
      name?: string;
      bio?: string;
    };
  };
}

export const PostPreview = ({ post, ...props }: PostPreviewProps) => {
  return (
    <Card
      href={`/blog/${post.slug}`}
      className="flex flex-col justify-between"
      {...props}
    >
      <div className="relative">
        {post.image && (
          <Image
            src={post.image}
            alt={`عکس پست "${post.title}"`}
            width={640}
            height={320}
            className="rounded-t-lg"
          />
        )}
      </div>
      <div className="px-2.5 py-3 sm:px-5 sm:py-4 space-y-2">
        <div className="flex items-center space-x-4 space-x-reverse">
          {post.publishedAt && (
            <div className="inline-flex items-center space-x-1 space-x-reverse text-xs text-secondary">
              <HiClock />
              <span>{post.publishedAt.formatted}</span>
            </div>
          )}
          {post.author && (
            <div className="inline-flex items-center space-x-1 space-x-reverse text-xs text-secondary">
              <HiUser />
              <span>{post.author.name}</span>
            </div>
          )}
        </div>
        <div className="text-2xl font-bold">{post.title}</div>
        {(post.summaryLimited || post.summary) && (
          <p className="text-sm text-secondary">
            {post.summaryLimited || post.summary}
          </p>
        )}
        {post.tags && (
          <div className="flex flex-wrap gap-2 text-sm text-secondary">
            {post.tags.map(({ name }) => (
              <span className="inline-block underline" key={name}>
                #{name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
