import { DOMAttributes } from 'react';

interface ICardProps extends DOMAttributes<HTMLDivElement | HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Card = ({ children, className, onClick, ...props }: ICardProps) => {
  const Component = onClick ? `button` : `div`;
  return (
    <Component
      {...props}
      onClick={onClick}
      className={`px-5 py-4 rounded-xl bg-gray-200 dark:bg-gray-800 shadow-md ${
        className || ''
      }`}
    >
      {children}
    </Component>
  );
};

export default Card;
