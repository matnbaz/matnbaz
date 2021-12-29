import classNames from 'classnames';
import Card, { ICardProps } from '../UI/Card';

export interface CollectionPreviewProps
  extends Omit<ICardProps, 'children' | 'href' | 'border'> {
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
  variation?: 'default' | 'big';
}

export const CollectionPreview = ({
  collection,
  variation = 'default',
  className,
  ...props
}: CollectionPreviewProps) => {
  const { name, slug, color, image, description, repositoriesCount } =
    collection;
  return (
    <Card
      key={slug}
      border="none"
      style={color && { backgroundColor: color.hexString }}
      className={classNames(
        'text-white',
        !color && 'bg-gray-100 dark:bg-gray-800 flex flex-col items-center',
        className
      )}
      href={`/collections/${slug}`}
      {...props}
    >
      <div
        className={classNames(
          'h-full',
          !props.disabled && 'hover:backdrop-brightness-75 transition',
          variation === 'big'
            ? 'px-3 py-4 sm:px-6 sm:py-5'
            : 'px-2.5 py-3 sm:px-5 sm:py-4'
        )}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {image && (
          <img
            alt={name}
            src={image}
            className={classNames(
              'brightness-0 invert mx-auto',
              variation === 'big' ? 'w-24 h-24' : 'w-10 h-10 sm:w-14 sm:h-14'
            )}
          />
        )}
        {/* eslint-enable @next/next/no-img-element */}
        <div
          dir="ltr"
          className="text-center text-sm sm:text-lg sm:font-bold mt-4"
        >
          {name}
        </div>
        {variation === 'big' && description && (
          <p className="mt-2 text-center text-medium">{description}</p>
        )}
      </div>
    </Card>
  );
};
