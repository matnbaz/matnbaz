import styles from './SkeletonLoaderShape.module.css';
enum ShapeClasses {
  'circle' = 'rounded-full',
  'rectangle' = '',
}

interface ISkeletonShapeProps {
  shape: keyof typeof ShapeClasses;
  width: string;
  height: string;
  className?: string;
}

const SkeletonLoaderShape = ({
  shape,
  width,
  height,
  className,
}: ISkeletonShapeProps) => {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-600 ${ShapeClasses[shape]} ${
        styles.shimmer
      } ${className || ''}`}
      style={{ width, height }}
    />
  );
};

export default SkeletonLoaderShape;
