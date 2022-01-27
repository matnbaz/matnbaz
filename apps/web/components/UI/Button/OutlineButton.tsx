import classNames from 'classnames';
import { Button, ButtonProps } from './Button';

export const OutlineButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(className, 'dark:border-white border-gray-900')}
    >
      {children}
    </Button>
  );
};
