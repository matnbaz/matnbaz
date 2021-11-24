import Card from '../UI/Card';
import SkeletonLoaderShape from './SkeletonLoaderShape';

const RepositoryPreviewSkeletonLoader = () => {
  return (
    // TODO: update this for mobile
    <Card padded>
      <div className="flex space-x-3 space-x-reverse justify-end">
        <div className="flex flex-col space-y-3 items-end">
          <SkeletonLoaderShape
            shape="rectangle"
            width="150px"
            height="10px"
            className="mb-1"
          />

          <SkeletonLoaderShape shape="rectangle" width="300px" height="5px" />
          <SkeletonLoaderShape shape="rectangle" width="300px" height="5px" />
          <SkeletonLoaderShape shape="rectangle" width="300px" height="5px" />
          <SkeletonLoaderShape shape="rectangle" width="225px" height="5px" />
        </div>
        <SkeletonLoaderShape shape="circle" width="64px" height="64px" />
      </div>
      <div className="flex justify-between items-center w-full mt-8">
        <div className="flex items-center space-x-2 space-x-reverse">
          <SkeletonLoaderShape shape="rectangle" width="21px" height="5px" />
          <SkeletonLoaderShape shape="circle" width="8px" height="8px" />
        </div>
        <div className="flex space-x-4 space-x-reverse">
          <div className="flex items-center space-x-2 space-x-reverse">
            <SkeletonLoaderShape shape="rectangle" width="20px" height="5px" />
            <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <SkeletonLoaderShape shape="rectangle" width="20px" height="5px" />
            <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
          </div>
          <div className="flex items-center space-x-2 space-x-reverse">
            <SkeletonLoaderShape shape="rectangle" width="20px" height="5px" />
            <SkeletonLoaderShape shape="circle" width="20px" height="20px" />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RepositoryPreviewSkeletonLoader;
