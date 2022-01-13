import { SkeletonLoaderShape } from './SkeletonLoaderShape';

export const LanguagesFilterSkeletonLoader = () => {
  return (
    <div className="flex items-center space-x-2 space-x-reverse">
      <SkeletonLoaderShape
        shape="rectangle"
        width="15px"
        height="15px"
        className="mb-1"
      />
      <SkeletonLoaderShape
        shape="rectangle"
        width="110px"
        height="10px"
        className="mb-1"
      />
    </div>
  );
};
