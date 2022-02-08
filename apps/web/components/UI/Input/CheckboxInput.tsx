import { Switch, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';

export interface CheckboxInputProps {
  className?: string;
  checked?: boolean;
  onClick?: () => void;
  onChange?: (value) => void;
  label?: string;
}

export const CheckboxInput = ({
  className,
  checked: checkedProp = false,
  onChange,
  label,
  ...props
}: CheckboxInputProps) => {
  const [checked, setChecked] = useState(checkedProp);

  useEffect(() => {
    setChecked(checkedProp);
  }, [checkedProp]);

  const splittedClassName = className ? className.split(' ') : []; // what is this
  // the given className might not contain width and height, so we find and store them in this object so we could use it if it's provided or set a default width and height if it's not provided
  const { width, height } = {
    width: splittedClassName.find((tClass) => tClass.startsWith('w')),
    height: splittedClassName.find((tClass) => tClass.startsWith('h')),
  };

  if (checked === undefined || checked === null) return <></>;

  return (
    <Switch.Group>
      <Switch
        {...props}
        className={classNames(
          className,
          width || 'w-4',
          height || 'h-4',
          checked
            ? 'bg-primary-500/90 backdrop-blur-sm'
            : 'bg-gray-200/80 dark:bg-gray-600/80 backdrop-blur-sm',
          'rounded-sm shadow-sm cursor-pointer text-white relative transition-all ease-in-out duration-75'
        )}
        checked={checked}
        onChange={(value) => {
          if (onChange) onChange(value);
          setChecked(value);
        }}
      >
        <Transition
          show={checked}
          enter="transition-opacity duration-75 ease-in-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-75 ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <AiOutlineCheck className="w-3/4 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </Transition>
      </Switch>
      {label && (
        <Switch.Label className="mx-2 text-sm text-secondary inline-flex items-center ltr:text-left rtl:text-right">
          {label}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};
