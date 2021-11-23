import classNames from 'classnames';
import Button, { IButtonProps } from './Button';

const RedButton = ({ children, className, ...props }: IButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(
        className,
        'bg-red-400 dark:bg-red-500 focus:ring-red-400 dark:focus:ring-red-500 hover:bg-red-500 dark:hover:bg-red-400'
      )}
    >
      {children}
    </Button>
  );
};

export default RedButton;
