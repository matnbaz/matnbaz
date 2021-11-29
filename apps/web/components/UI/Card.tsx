import classNames from 'classnames';
import { DOMAttributes, useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
interface ICardProps
  extends DOMAttributes<HTMLDivElement | HTMLAnchorElement | LinkProps> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  colored?: boolean;
  padded?: boolean;
  href?: string;
}
const Card = ({
  children,
  padded = false,
  colored = false,
  className,
  onClick,
  href,
  ...props
}: ICardProps) => {
  const cardClasses = useMemo(() => {
    return classNames(
      className,
      colored && 'bg-gray-200 dark:bg-gray-800',
      padded && 'px-5 py-4',
      'border dark:border-gray-700 rounded-lg'
    );
  }, [className, colored, padded]);
  if (href)
    return (
      <Link href={href} passHref>
        <a className={cardClasses} {...props} onClick={onClick}>
          {children}
        </a>
      </Link>
    );
  const Component = onClick ? `a` : `div`;
  return (
    <Component {...props} onClick={onClick} className={cardClasses}>
      {children}
    </Component>
  );
};

export default Card;
