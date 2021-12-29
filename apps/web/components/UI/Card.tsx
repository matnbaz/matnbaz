import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { CSSProperties, DOMAttributes, useMemo } from 'react';
export interface ICardProps
  extends DOMAttributes<HTMLDivElement | HTMLAnchorElement | LinkProps> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  colored?: boolean;
  padded?: boolean;
  style?: CSSProperties;
  border?: 'desktop' | 'all' | 'none';
  href?: string;
  disabled?: boolean;
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
      'rounded-lg border-gray-200 dark:border-gray-700 block disabled:pointer-events-none'
    );
  }, [className, colored, padded, border]);
  if (href && !props.disabled)
    return (
      <Link href={href} passHref>
        <a
          className={cardClasses}
          target={href.match(/https?:\/\//) ? '_blank' : undefined}
          {...props}
          onClick={props.disabled ? (e) => e.preventDefault() : onClick}
        >
          {children}
        </a>
      </Link>
    );
  const Component = onClick ? `a` : `div`;
  return (
    <Component
      {...props}
      onClick={props.disabled ? (e) => e.preventDefault() : onClick}
      className={cardClasses}
    >
      {children}
    </Component>
  );
};

export default Card;
