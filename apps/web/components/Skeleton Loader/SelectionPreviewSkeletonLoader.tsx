import classNames from 'classnames';
import { ISelectionPreviewProps } from '../Selection/SelectionPreview';
import { Card } from '../UI/Card';
import { SkeletonLoaderShape } from './SkeletonLoaderShape';

export type ISelectionPreviewSkeletonLoaderProps = Omit<
  ISelectionPreviewProps,
  'selection'
>;

export const SelectionPreviewSkeletonLoader = ({
  className,
  ...props
}: ISelectionPreviewSkeletonLoaderProps) => {
  return (
    <Card
      {...props}
      className={classNames(className, 'px-2.5 py-3 sm:px-5 sm:py-4')}
    >
      <div className="flex justify-between gap-4">
        <div className="space-y-2 flex flex-col w-full">
          <SkeletonLoaderShape shape="rectangle" width="64px" height="24px" />
          <SkeletonLoaderShape shape="rectangle" width="80%" height="12px" />
          <SkeletonLoaderShape shape="rectangle" width="40%" height="12px" />

          <SkeletonLoaderShape shape="rectangle" width="48px" height="8px" />
        </div>
        <div>
          <SkeletonLoaderShape shape="circle" width="48px" height="48px" />
        </div>
      </div>
    </Card>
  );
};
