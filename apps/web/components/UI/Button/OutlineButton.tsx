import classNames from 'classnames';
import { Button, IButtonProps } from './Button';

export const OutlineButton = ({
  children,
  className,
  ...props
}: IButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(className, 'dark:border-white border-gray-900')}
    >
      {children}
    </Button>
  );
};
