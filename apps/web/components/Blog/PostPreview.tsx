import Image from 'next/image';
import { HiClock, HiUser } from 'react-icons/hi';
import { Card, ICardProps } from '../UI/Card';

export interface PostPreviewProps extends Omit<ICardProps, 'children'> {
  post: {
    id: string;
    slug: string;
    title: string;
    image?: string;
    tags?: string[];
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
      <div className="px-2.5 py-3 sm:px-5 sm:py-4">
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
        <div className="mt-2 text-2xl font-bold">{post.title}</div>
        {post.tags && (
          <div className="mt-1 space-x-2 space-x-reverse text-sm text-secondary">
            {post.tags.map((tag) => (
              <span className="inline-block" key={tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
