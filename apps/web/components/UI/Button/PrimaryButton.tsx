import classNames from 'classnames';
import Button, { IButtonProps } from './Button';

const PrimaryButton = ({ children, className, ...props }: IButtonProps) => {
  return (
    <Button
      {...props}
      className={classNames(
        className,
        'bg-primary-400 dark:bg-primary-500 focus:ring-primary-400 dark:focus:ring-primary-500 hover:bg-primary-500 dark:hover:bg-primary-400'
      )}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
