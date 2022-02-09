import { Switch } from '@headlessui/react';
import classNames from 'classnames';

interface RadioInputProps {
  className?: string;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (value) => void;
}

export const RadioInput = ({
  className,
  checked: checkedProp = false,
  onChange,
  ...props
}: RadioInputProps) => {
  const splitClassName = className?.split(' ');
  // the given className might not contain width and height, so we find and store them in this object so we could use it if it's provided or set a default width and height if it's not provided
  const { width, height } = {
    width: splitClassName?.find((tClass) => tClass.startsWith('w-')),
    height: splitClassName?.find((tClass) => tClass.startsWith('h-')),
  };

  return (
    <Switch
      {...props}
      className={classNames(
        className,
        width || 'w-4',
        height || 'h-4',
        'bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-full shadow-sm cursor-pointer text-white flex items-center transition-all ease-in-out duration-75'
      )}
      checked={checkedProp}
      onChange={(value) => {
        if (onChange) onChange(value);
      }}
    >
      <div
        className={classNames(
          checkedProp ? 'opacity-100' : 'opacity-0',
          'w-1/2 h-1/2 bg-primary-400 dark:bg-primary-500 rounded-full m-auto transition-all duration-200'
        )}
      />
    </Switch>
  );
};
