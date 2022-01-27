import classNames from 'classnames';
import Link, { LinkProps } from 'next/link';
import { CSSProperties, DOMAttributes, useMemo } from 'react';
export interface CardProps
  extends DOMAttributes<HTMLDivElement | HTMLAnchorElement | LinkProps> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  bgColor?: 'none' | 'normal' | 'standout';
  padded?: boolean;
  style?: CSSProperties;
  border?: 'desktop' | 'all' | 'none';
  href?: string;
  disabled?: boolean;
}

export const Card = ({
  children,
  padded = false,
  bgColor = 'none',
  className,
  border = 'all',
  onClick,
  href,
  ...props
}: CardProps) => {
  const cardClasses = useMemo(() => {
    return classNames(
      className,
      bgColor === 'standout' && 'bg-gray-100 dark:bg-gray-800',
      bgColor === 'normal' && 'bg-white dark:bg-gray-900',
      padded && 'px-2.5 py-3 sm:px-5 sm:py-4',
      border === 'all' ? 'border' : border === 'desktop' ? 'sm:border' : '',
      'rounded-lg border-gray-200 dark:border-gray-700 block disabled:pointer-events-none'
    );
  }, [className, bgColor, padded, border]);
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
