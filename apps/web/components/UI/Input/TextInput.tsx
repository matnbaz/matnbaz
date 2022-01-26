import classNames from 'classnames';
import { forwardRef } from 'react';
import { IconType } from 'react-icons/lib';
import { InputProps } from './Input';

export interface TextInputProps extends InputProps {
  icon?: IconType;
  noBorder?: boolean;
}

export const TextInput = forwardRef<HTMLInputElement>(
  ({ className, icon, noBorder = false, ...props }: TextInputProps, ref) => {
    const IconComponent = icon;
    return (
      <div className="relative w-full inline-block">
        <input
          {...props}
          ref={ref}
          className={classNames(
            className,
            icon && 'pr-8',
            !noBorder && 'border',
            'placeholder:text-slate-600 dark:placeholder:text-slate-400 rounded-md border-gray-300 shadow-sm px-4 py-2 bg-transparent dark:border-gray-600 text-sm font-medium text-gray-700 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500'
          )}
        />
        {icon && (
          <IconComponent className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 opacity-75" />
        )}
      </div>
    );
  }
);

TextInput.displayName = 'TextInput';
