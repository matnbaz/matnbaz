import classNames from 'classnames';
import { TextareaHTMLAttributes } from 'react';
import { IconType } from 'react-icons/lib';

export interface ITextInputProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: IconType;
}

export const TextareaInput = ({
  className,
  icon,
  ...props
}: ITextInputProps) => {
  const IconComponent = icon;
  return (
    <div className="relative">
      <textarea
        {...props}
        className={classNames(
          className,
          icon && 'pr-8',
          'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-transparent dark:border-gray-600 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500'
        )}
      />
      {icon && (
        <IconComponent className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 opacity-75" />
      )}
    </div>
  );
};
