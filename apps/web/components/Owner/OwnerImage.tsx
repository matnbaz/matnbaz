import classNames from 'classnames';
import Link from 'next/link';
import { useMemo } from 'react';
interface OwnerImageProps {
  owner: {
    platformId: string;
    login?: string;
    name?: string;
    type?: string;
    __typename?: string;
  };
  className?: string;
  width?: number;
  height?: number;
  withoutLink?: boolean;
}

export const OwnerImage = ({
  owner,
  width,
  height,
  className,
  withoutLink = false,
}: OwnerImageProps) => {
  const ImageComponent = useMemo(
    () => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        width={width || 100}
        height={height || 100}
        src={`https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`}
        alt={`عکس ${owner.name || owner.login || `کاربر ${owner.platformId}`}`}
        title={owner.name || owner.login || `کاربر ${owner.platformId}`}
        className={classNames(
          owner?.type === 'User' || owner.__typename === 'OwnerUser'
            ? 'rounded-full'
            : 'rounded-lg',
          className
        )}
      />
    ),
    [owner, width, height, className]
  );
  return withoutLink ? (
    ImageComponent
  ) : (
    <Link href={`/github/${owner.login}`}>
      <a>{ImageComponent}</a>
    </Link>
  );
};
