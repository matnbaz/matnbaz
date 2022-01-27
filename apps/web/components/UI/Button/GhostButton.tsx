import classNames from 'classnames';
import { Button, ButtonProps } from './Button';

export const GhostButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <Button {...props} className={classNames(className, 'border-transparent')}>
      {children}
    </Button>
  );
};
