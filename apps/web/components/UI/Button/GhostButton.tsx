import classNames from 'classnames';
import { Button, IButtonProps } from './Button';

export const GhostButton = ({
  children,
  className,
  ...props
}: IButtonProps) => {
  return (
    <Button {...props} className={classNames(className, 'border-transparent')}>
      {children}
    </Button>
  );
};
