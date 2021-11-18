import { DOMAttributes } from 'react';

interface ICardProps extends DOMAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}
const Card = ({ children, className, ...props }: ICardProps) => {
  return (
    <div
      {...props}
      className={`px-5 py-4 rounded-xl bg-gray-100 dark:bg-gray-800 ${
        className || ''
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
