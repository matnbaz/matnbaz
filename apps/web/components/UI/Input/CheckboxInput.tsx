import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IInputProps } from './Input';

interface ICheckboxInputProps {
  className?: string;
  checked: boolean;
  onClick?: () => void;
  onChange?: (value) => void;
}

const CheckboxInput = ({
  className,
  checked: checkedProp = false,
  onChange,
  ...props
}: ICheckboxInputProps) => {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const splittedClassName = className.split(' ');
  // the given className might not contain width and height, so we find and store them in this object so we could use it if it's provided or set a default width and height if it's not provided
  const { width, height } = {
    width: splittedClassName.find((tClass) => tClass.startsWith('w')),
    height: splittedClassName.find((tClass) => tClass.startsWith('h')),
  };

  if (checked === undefined || checked === null) return <></>;

  return (
    <Switch
      {...props}
      className={classNames(
        className,
        width || 'w-4',
        height || 'h-4',
        checked ? 'bg-primary-500' : 'bg-white dark:bg-gray-600',
        'rounded-sm shadow-sm cursor-pointer text-white relative'
      )}
      checked={checked}
      onChange={(value) => {
        if (onChange) onChange(value);
        setChecked(value);
      }}
    >
      {checked && (
        <AiOutlineCheck className="w-3/4 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </Switch>
  );
};

export default CheckboxInput;
