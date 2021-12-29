import classNames from 'classnames';
import Card from '../UI/Card';

export interface CollectionPreviewProps {
  className: string;
  collection: {
    name: string;
    slug: string;
    description?: string;
    repositoriesCount: number;
    color?: {
      hexString: string;
    };
    image?: string;
  };
  isBig?: boolean;
}

export const CollectionPreview = ({
  collection,
  isBig = false,
  className,
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
    >
      <div
        className={classNames(
          'hover:backdrop-brightness-75 transition h-full',
          isBig ? 'px-3 py-4 sm:px-6 sm:py-5' : 'px-2.5 py-3 sm:px-5 sm:py-4'
        )}
      >
        {/* eslint-disable @next/next/no-img-element */}
        {image && (
          <img
            alt={name}
            src={image}
            className={classNames(
              'brightness-0 invert mx-auto',
              isBig ? 'w-24 h-24' : 'w-14 h-14'
            )}
          />
        )}
        {/* eslint-enable @next/next/no-img-element */}
        <div dir="ltr" className="text-center text-lg font-bold mt-4">
          {name}
        </div>
        {isBig && description && (
          <p className="mt-2 text-center text-medium">{description}</p>
        )}
      </div>
    </Card>
  );
};
