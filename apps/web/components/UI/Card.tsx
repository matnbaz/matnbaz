import classNames from 'classnames';
import { DOMAttributes } from 'react';

interface ICardProps extends DOMAttributes<HTMLDivElement | HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  colored?: boolean;
  padded?: boolean;
}
const Card = ({
  children,
  padded = false,
  colored = false,
  className,
  onClick,
  ...props
}: ICardProps) => {
  const Component = onClick ? `button` : `div`;
  return (
    <Component
      {...props}
      onClick={onClick}
      className={classNames(
        className,
        colored && 'bg-gray-200 dark:bg-gray-800',
        padded && 'px-5 py-4',
        'border dark:border-gray-700 rounded-lg'
      )}
    >
      {children}
    </Component>
  );
};

export default Card;
