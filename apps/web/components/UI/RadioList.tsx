import { RadioGroup } from '@headlessui/react';
import classNames from 'classnames';
import { DOMAttributes, useEffect, useMemo, useState } from 'react';
import Input from './Input/Input';
interface IOption {
  id?: string | number;
  name: string;
  key?: string | number;
}

type TValue = IOption;

interface IRadioListProps {
  options: IOption[];
  value?: TValue;
  className?: string;
  dir?: 'ltr' | 'rtl';
  onChange?: (values: TValue) => void;
}

const RadioList = ({
  options,
  value,
  className,
  dir = 'rtl',
  onChange,
}: IRadioListProps) => {
  const [selectedOption, setSelectedOption] = useState<TValue>(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  useEffect(() => {
    if (selectedOption && onChange) onChange(selectedOption);
  }, [JSON.stringify(selectedOption)]);

  return (
    <RadioGroup
      value={selectedOption}
      onChange={setSelectedOption}
      as="div"
      className={classNames(className, 'flex flex-col space-y-4 pb-2')}
    >
      {options.map((option) => (
        <RadioGroup.Option
          key={option.id || option.key || option.name}
          as="div"
          value={option}
          className={classNames(
            dir === 'ltr' && 'text-right',
            'text-sm text-secondary inline-flex items-center space-x-2 space-x-reverse'
          )}
        >
          <Input.Radio
            checked={JSON.stringify(selectedOption) === JSON.stringify(option)}
          />
          <span className="cursor-pointer">{option.name}</span>
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default RadioList;
