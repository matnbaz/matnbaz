import Image from 'next/image';
import { HiClock, HiUser } from 'react-icons/hi';
import { Card, ICardProps } from '../UI/Card';

export interface PostPreviewProps extends Omit<ICardProps, 'children'> {
  post: {
    id: string;
    slug: string;
    title: string;
    image?: string;
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
      <div>
        {post.image && (
          <Image src={post.image} alt={`عکس پست "${post.title}"`} />
        )}
        <div className="text-xl font-bold">{post.title}</div>
      </div>
      <div className="mt-2 flex items-center space-x-4 space-x-reverse">
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
    </Card>
  );
};
