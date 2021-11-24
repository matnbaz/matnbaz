import classNames from 'classnames';
import Button, { IButtonProps } from './Button';

const GhostButton = ({ children, className, ...props }: IButtonProps) => {
  return (
    <Button {...props} className={classNames(className, 'border-transparent')}>
      {children}
    </Button>
  );
};

export default GhostButton;
