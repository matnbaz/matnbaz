import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
interface IOwnerImageProps {
  owner: { platformId: string; login: string; type?: string };
  width?: number;
  height?: number;
}

const OwnerImage = ({ owner, width, height }: IOwnerImageProps) => {
  return (
    <Link href={`/github/${owner.login}`}>
      <Image
        width={width || 100}
        height={height || 100}
        src={`https://avatars.githubusercontent.com/u/${owner.platformId}?v=4`}
        alt={`عکس ${owner.login}`}
        className={classNames(
          owner?.type === 'User' ? 'rounded-full' : 'rounded-lg',
          'cursor-pointer'
        )}
      />
    </Link>
  );
};

export default OwnerImage;
