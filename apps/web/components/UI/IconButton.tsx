// This component will be added to buttons component in the future.

import classNames from 'classnames';
import {
  ButtonHTMLAttributes,
  HTMLAttributeAnchorTarget,
  PropsWithChildren,
} from 'react';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  href?: string;
  rel?: string | undefined;
  target?: HTMLAttributeAnchorTarget | undefined;
}
export const IconButton = ({
  children,
  className,
  ...props
}: PropsWithChildren<IconButtonProps>) => {
  const Component = props.href ? 'a' : 'button';
  return (
    <Component
      {...props}
      className={classNames(
        className,
        'whitespace-nowrap inline-flex items-center justify-center px-2 py-2 rounded-full focus:ring focus:outline-none dark:text-gray-200 dark:hover:text-white text-gray-700 hover:text-gray-900'
      )}
    >
      {children}
    </Component>
  );
};
