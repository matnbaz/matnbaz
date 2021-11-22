import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { IInputProps } from './Input';

interface ICheckboxInputProps extends IInputProps {
  onClick?: () => void;
  onChange?: (value) => void;
}

// TODO refactor this component

const CheckboxInput = ({
  className,
  checked: checkedProp = false,
  onClick,
  onChange,
  ...props
}: ICheckboxInputProps) => {
  const didMountRef = useRef(true);
  const [checked, setChecked] = useState(checkedProp);
  const splittedClassName = className.split(' ');
  // the given className might not contain width and height, so we find and store them in this object so we could use it if it's provided or set a default width and height if it's not provided
  const { width, height } = {
    width: splittedClassName.find((tClass) => tClass.startsWith('w')),
    height: splittedClassName.find((tClass) => tClass.startsWith('h')),
  };

  const [defaultWidth, defaultHeight] = ['w-4', 'h-4'];

  if (checked === undefined || checked === null) return <></>;

  useEffect(() => {
    if (didMountRef.current) didMountRef.current = false;
    else onChange?.(checked);
  }, [checked]);

  return (
    <button
      type="button"
      className={classNames(
        className,
        width || defaultWidth,
        height || defaultHeight,
        checked ? 'bg-primary-500' : 'bg-white dark:bg-gray-600',
        'rounded-sm shadow-sm cursor-pointer text-white relative'
      )}
      onClick={() => {
        setChecked((previousChecked) => {
          return !previousChecked;
        });
        onClick?.();
      }}
    >
      <input
        {...props}
        onChange={onChange}
        type="checkbox"
        checked={checked}
        className="hidden"
      />
      {checked && (
        <AiOutlineCheck className="w-3/4 h-3/4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      )}
    </button>
  );
};

export default CheckboxInput;
