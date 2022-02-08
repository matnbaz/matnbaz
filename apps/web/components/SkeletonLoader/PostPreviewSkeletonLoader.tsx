import classNames from 'classnames';
import { PostPreviewProps } from '../Blog/PostPreview';
import { Card } from '../UI/Card';
import { SkeletonLoaderShape } from './SkeletonLoaderShape';

export type IPostPreviewSkeletonLoaderProps = Omit<PostPreviewProps, 'post'>;

export const PostPreviewSkeletonLoader = ({
  className,
  ...props
}: IPostPreviewSkeletonLoaderProps) => {
  return (
    <Card
      {...props}
      className={classNames(className, 'flex flex-col justify-between')}
    >
      <div className="relative">
        <SkeletonLoaderShape
          shape="rectangle"
          width={'100%'}
          height={'230px'}
          className="rounded-t-lg"
        />
      </div>
      <div className="px-2.5 py-3 sm:px-5 sm:py-4 space-y-2">
        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-2">
          <div className="inline-flex items-center space-x-3 rtl:space-x-reverse text-xs text-secondary">
            <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
            <SkeletonLoaderShape shape="rectangle" width="80px" height="14px" />
          </div>

          <div className="inline-flex items-center space-x-3 rtl:space-x-reverse text-xs text-secondary">
            <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
            <SkeletonLoaderShape shape="rectangle" width="80px" height="14px" />
          </div>
        </div>
        <SkeletonLoaderShape shape="rectangle" width="256px" height="24px" />

        <SkeletonLoaderShape shape="rectangle" width="100%" height="10px" />
        <SkeletonLoaderShape shape="rectangle" width="100%" height="10px" />
        <SkeletonLoaderShape shape="rectangle" width="25%" height="10px" />
      </div>
    </Card>
  );
};
