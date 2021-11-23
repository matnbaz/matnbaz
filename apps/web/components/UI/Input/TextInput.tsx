import classNames from 'classnames';
import { IconType } from 'react-icons/lib';
import { IInputProps } from './Input';

export interface ITextInputProps extends IInputProps {
  icon?: IconType;
}

const TextInput = ({ className, icon, ...props }: ITextInputProps) => {
  const IconComponent = icon;
  return (
    <div className="relative">
      <input
        {...props}
        className={classNames(
          className,
          icon && 'pr-8',
          'rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white/80 dark:border-gray-600 dark:bg-gray-700/60 backdrop-blur-sm text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-500'
        )}
      />
      {icon && (
        <IconComponent className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2 opacity-75" />
      )}
    </div>
  );
};

export default TextInput;
