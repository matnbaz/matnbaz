import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import { Input } from './Input/Input';
interface Option {
  id?: string | number;
  name: string;
  value;
  key?: string | number;
}

export interface RadioListProps {
  options: Option[];
  value?: Option;
  className?: string;
  dir?: 'ltr' | 'rtl';
  onChange?: (values: Option) => void;
}

const compareOptions = (firstOption: Option, secondOption: Option) => {
  return firstOption.value === secondOption.value;
};

export const RadioList = ({
  options,
  value,
  className,
  dir = 'rtl',
  onChange,
}: RadioListProps) => {
  return (
    <RadioGroup
      value={value}
      onChange={(value) => {
        onChange(options.find((option) => option.value === value));
      }}
      as="div"
      className={classNames(className, 'flex flex-col space-y-4 pb-2')}
    >
      {options.map((option) => (
        <RadioGroup.Option
          key={option.id || option.key || option.value || option.name}
          as="div"
          value={option.value}
          className={classNames(
            dir === 'ltr' && 'text-right',
            'text-sm text-secondary inline-flex items-center space-x-2 rtl:space-x-reverse'
          )}
        >
          <Input.Radio checked={compareOptions(value, option)} />
          <span className="cursor-pointer">{option.name}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};
