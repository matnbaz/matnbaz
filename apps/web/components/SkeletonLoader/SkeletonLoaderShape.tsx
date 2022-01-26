import styles from './SkeletonLoaderShape.module.css';
enum ShapeClasses {
  'circle' = 'rounded-full',
  'rectangle' = '',
}

export interface SkeletonShapeProps {
  shape: keyof typeof ShapeClasses;
  width: string;
  height: string;
  className?: string;
}

export const SkeletonLoaderShape = ({
  shape,
  width,
  height,
  className,
}: SkeletonShapeProps) => {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-700 ${ShapeClasses[shape]} ${
        styles.shimmer
      } ${className || ''}`}
      style={{ width, height }}
    />
  );
};
