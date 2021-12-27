import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { DOMAttributes, useMemo } from 'react';
interface ICardProps
  extends DOMAttributes<HTMLDivElement | HTMLAnchorElement | LinkProps> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  colored?: boolean;
  padded?: boolean;
  border?: 'desktop' | 'all' | 'none';
  href?: string;
}
const Card = ({
  children,
  padded = false,
  colored = false,
  className,
  border = 'all',
  onClick,
  href,
  ...props
}: ICardProps) => {
  const cardClasses = useMemo(() => {
    return classNames(
      className,
      colored && 'bg-gray-200 dark:bg-gray-800',
      padded && 'px-2.5 py-3 sm:px-5 sm:py-4',
      border === 'all' ? 'border' : border === 'desktop' ? 'sm:border' : '',
      'rounded-lg border-gray-200 dark:border-gray-700'
    );
  }, [className, colored, padded, border]);
  if (href)
    return (
      <Link href={href} passHref>
        <a
          className={cardClasses}
          target={href.match(/https?:\/\//) ? '_blank' : undefined}
          {...props}
          onClick={onClick}
        >
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
