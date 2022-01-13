import { persianNumbers } from '@matnbaz/common';
import classNames from 'classnames';
import { Card, ICardProps } from '../UI/Card';

export interface ICollectionPreviewProps
  extends Omit<ICardProps, 'children' | 'href'> {
  collection: {
    name: string;
    slug: string;
    description?: string;
    repositoriesCount?: number;
    color?: {
      hexString: string;
    };
    image?: string;
  };
}

export const CollectionPreview = ({
  collection,
  className,
  style = {},
  ...props
}: ICollectionPreviewProps) => {
  const { name, slug, color, image, description, repositoriesCount } =
    collection;
  return (
    <Card
      key={slug}
      className={classNames('flex flex-col items-center', className)}
      href={`/collections/${slug}`}
      {...props}
    >
      <div
        className={classNames(
          'h-full px-2.5 py-3 sm:px-5 sm:py-4',
          !props.disabled && 'hover:backdrop-brightness-75 transition'
        )}
      >
        <div>
          {/* eslint-disable @next/next/no-img-element */}
          {image && (
            <img
              alt={name}
              src={image}
              className={classNames(
                'brightness-0 dark:invert w-10 h-10 float-left'
              )}
            />
          )}
          <div className="mt-4 flex items-center space-x-2 space-x-reverse">
            <div
              className="w-4 h-4 rounded-full"
              style={color && { backgroundColor: color.hexString, ...style }}
            />
            <h3
              className="text-sm sm:text-xl sm:font-bold text-right"
              dir="ltr"
            >
              {name}
            </h3>
          </div>
          {repositoriesCount && (
            <div className="text-secondary font-medium">
              {persianNumbers(repositoriesCount)} پروژه
            </div>
          )}
          {description && <p className="mt-2 text-secondary">{description}</p>}
        </div>
      </div>
    </Card>
  );
};
