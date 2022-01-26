import classNames from 'classnames';
import { PostPreviewProps } from '../Blog/PostPreview';
import { Card } from '../UI/Card';

export type IPostPreviewSkeletonLoaderProps = Omit<PostPreviewProps, 'post'>;

export const PostPreviewSkeletonLoader = ({
  className,
  ...props
}: IPostPreviewSkeletonLoaderProps) => {
  return (
    <Card
      {...props}
      className={classNames(className, 'px-2.5 py-3 sm:px-5 sm:py-4')}
    >
      <div></div>
    </Card>
  );
};
