import classNames from 'classnames';
import { Button, IButtonProps } from './Button';

export const RedButton = ({ children, className, ...props }: IButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(
        className,
        'border-transparent text-white bg-red-500 dark:bg-red-600 focus:ring-red-500 dark:focus:ring-red-500 hover:bg-red-600 dark:hover:bg-red-700'
      )}
    >
      {children}
    </Button>
  );
};
