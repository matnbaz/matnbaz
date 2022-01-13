import classNames from 'classnames';
import { Button, IButtonProps } from './Button';

export const PrimaryButton = ({
  children,
  className,
  ...props
}: IButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(
        className,
        'border-transparent text-white bg-primary-500 dark:bg-primary-600 focus:ring-primary-500 dark:focus:ring-primary-500 hover:bg-primary-600 dark:hover:bg-primary-700'
      )}
    >
      {children}
    </Button>
  );
};
