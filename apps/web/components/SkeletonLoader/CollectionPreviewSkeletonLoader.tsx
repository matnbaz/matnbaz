import classNames from 'classnames';
import { ICollectionPreviewProps } from '../Collection/CollectionPreview';
import { Card } from '../UI/Card';
import { SkeletonLoaderShape } from './SkeletonLoaderShape';

export type ICollectionPreviewSkeletonLoaderProps = Omit<
  ICollectionPreviewProps,
  'collection'
>;

export const CollectionPreviewSkeletonLoader = ({
  className,
  ...props
}: ICollectionPreviewSkeletonLoaderProps) => {
  return (
    <Card
      {...props}
      className={classNames(className, 'px-2.5 py-3 sm:px-5 sm:py-4')}
    >
      <div dir="ltr" className="relative">
        <SkeletonLoaderShape
          shape="circle"
          width="48px"
          height="48px"
          className="absolute top-0 left-0"
        />
        <div className="flex flex-col items-end w-full my-2">
          <div className="flex items-center flex-row-reverse space-x-reverse space-x-2 w-full">
            <SkeletonLoaderShape shape="circle" width="24px" height="24px" />
            <SkeletonLoaderShape shape="rectangle" width="40%" height="16px" />
          </div>
          <SkeletonLoaderShape
            shape="rectangle"
            width="30%"
            height="10px"
            className="mt-2"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="100%"
            height="12px"
            className="mt-4"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="100%"
            height="12px"
            className="mt-2"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="60%"
            height="12px"
            className="mt-2"
          />
        </div>
      </div>
    </Card>
  );
};
