import classNames from 'classnames';
import { ICollectionPreviewProps } from '../Collection/CollectionPreview';
import Card from '../UI/Card';
import SkeletonLoaderShape from './SkeletonLoaderShape';

export type ICollectionPreviewSkeletonLoaderProps = Omit<
  ICollectionPreviewProps,
  'collection'
>;

const CollectionPreviewSkeletonLoader = ({
  variation = 'default',
  className,
  ...props
}: ICollectionPreviewSkeletonLoaderProps) => {
  return (
    <Card
      {...props}
      className={classNames(
        className,
        variation === 'big'
          ? 'px-3 py-4 sm:px-6 sm:py-5'
          : 'px-2.5 py-3 sm:px-5 sm:py-4'
      )}
    >
      <div className="flex flex-col items-center space-y-2" dir="ltr">
        <SkeletonLoaderShape
          shape="circle"
          width="96px"
          height="96px"
          className="flex-shrink-0"
        />
        <div className="flex flex-col items-start w-full mt-4">
          <SkeletonLoaderShape
            shape="rectangle"
            width="40%"
            height="16px"
            className="mx-auto"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="80%"
            height="8px"
            className="mt-4 mx-auto"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="80%"
            height="8px"
            className="mt-2 mx-auto"
          />
          <SkeletonLoaderShape
            shape="rectangle"
            width="60%"
            height="8px"
            className="mt-2 mx-auto"
          />
        </div>
      </div>
    </Card>
  );
};

export default CollectionPreviewSkeletonLoader;
