import { PlatformType } from '../../lib/graphql-types';
import { Card, ICardProps } from '../UI/Card';

export interface PostPreviewProps extends Omit<ICardProps, 'children'> {
  post: {
    id: string;
    slug: string;
    title: string;
    thumbnailImage: string;
    publishedAt?: {
      formatted: string;
      difference: string;
    };
    authors: {
      id: string;
      additions: number;
      deletions: number;
      owner: {
        id: string;
        login: string;
        platform: PlatformType;
        platformId: string;
      };
    }[];
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
        <img src={post.thumbnailImage} alt={`عکس پست "${post.title}"`} />
        <div className="font-bold">{post.title}</div>
      </div>
      {post.publishedAt && <div>{post.publishedAt.formatted}</div>}
    </Card>
  );
};
