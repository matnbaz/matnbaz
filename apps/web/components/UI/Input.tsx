import classNames from 'apps/web/utils/classNames';
import { InputHTMLAttributes } from 'react';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}
const Input = ({ className, ...props }: IInputProps) => {
  return (
    <input
      {...props}
      className={classNames(
        className || '',
        'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500'
      )}
    />
  );
};

export default Input;
