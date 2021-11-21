import classNames from 'apps/web/utils/classNames';
import { InputHTMLAttributes } from 'react';
import { HiStar } from 'react-icons/hi';
import { IconType } from 'react-icons/lib';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  icon?: IconType;
}
const Input = ({ className, icon, ...props }: IInputProps) => {
  const IconComponent = icon;
  return (
    <div className="relative">
      <input
        {...props}
        className={classNames(
          className,
          icon && 'pr-8',
          'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500'
        )}
      />
      {icon && (
        <IconComponent className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 opacity-75" />
      )}
    </div>
  );
};

export default Input;
