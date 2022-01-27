import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';

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
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const splittedClassName = className?.split(' ');
  // the given className might not contain width and height, so we find and store them in this object so we could use it if it's provided or set a default width and height if it's not provided
  const { width, height } = {
    width: splittedClassName?.find((tClass) => tClass.startsWith('w')),
    height: splittedClassName?.find((tClass) => tClass.startsWith('h')),
  };

  if (checked === undefined || checked === null) return <></>;

  return (
    <Switch
      {...props}
      className={classNames(
        className,
        width || 'w-4',
        height || 'h-4',
        'bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm rounded-full shadow-sm cursor-pointer text-white flex items-center transition-all ease-in-out duration-75'
      )}
      checked={checked}
      onChange={(value) => {
        if (!value) return;
        if (onChange) onChange(value);
        setChecked(value);
      }}
    >
      <div
        className={classNames(
          checked ? 'opacity-100' : 'opacity-0',
          'w-1/2 h-1/2 bg-primary-400 dark:bg-primary-500 rounded-full m-auto transition-all duration-200'
        )}
      />
    </Switch>
  );
};
