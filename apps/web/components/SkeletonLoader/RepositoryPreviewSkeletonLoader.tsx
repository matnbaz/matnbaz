import { RepositoryPreviewProps } from '../Repository/RepositoryPreview';
import { Card } from '../UI/Card';
import { SkeletonLoaderShape } from './SkeletonLoaderShape';

export type IRepositoryPreviewSkeletonLoaderProps = Omit<
  RepositoryPreviewProps,
  'repository'
>;

export const RepositoryPreviewSkeletonLoader = ({
  sendToPlatform,
  ...props
}: IRepositoryPreviewSkeletonLoaderProps) => {
  return (
    <Card {...props}>
      <div dir="ltr">
        <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
          <SkeletonLoaderShape
            shape="circle"
            width="64px"
            height="64px"
            className="flex-shrink-0"
          />
          <div className="flex flex-col space-y-3 items-start w-full">
            <SkeletonLoaderShape
              shape="rectangle"
              width="60%"
              height="10px"
              className="mb-1"
            />

            <SkeletonLoaderShape shape="rectangle" width="100%" height="5px" />
            <SkeletonLoaderShape shape="rectangle" width="100%" height="5px" />
            <SkeletonLoaderShape shape="rectangle" width="100%" height="5px" />
            <SkeletonLoaderShape shape="rectangle" width="90%" height="5px" />
          </div>
        </div>
        <div className="flex justify-between items-center w-full mt-8">
          <div className="flex flex-col md:flex-row space-y-4 space-x-0 md:space-y-0 md:space-x-4">
            <div className="flex items-center space-x-2">
              <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
              <SkeletonLoaderShape
                shape="rectangle"
                width="20px"
                height="5px"
              />
            </div>
            <div className="flex items-center space-x-2">
              <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
              <SkeletonLoaderShape
                shape="rectangle"
                width="20px"
                height="5px"
              />
            </div>
            <div className="flex items-center space-x-2">
              <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
              <SkeletonLoaderShape
                shape="rectangle"
                width="20px"
                height="5px"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <SkeletonLoaderShape shape="rectangle" width="21px" height="5px" />
            <SkeletonLoaderShape shape="circle" width="8px" height="8px" />
          </div>
        </div>
      </div>
    </Card>
  );
};
