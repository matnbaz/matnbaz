import classNames from 'classnames';
import { DOMAttributes, useEffect, useMemo, useState } from 'react';
import Input from './Input/Input';
interface IOption {
  name: string;
}

type TValue = IOption[];

interface ICheckboxListProps {
  options: IOption[];
  value?: TValue;
  className?: string;
  dir?: 'ltr' | 'rtl';
  onChange?: (values: TValue) => void;
}

const CheckboxList = ({
  options,
  value = [],
  className,
  dir = 'rtl',
  onChange,
}: ICheckboxListProps) => {
  const [selectedOptions, setSelectedOptions] = useState<TValue>(value);

  useEffect(() => {
    if (selectedOptions) onChange(selectedOptions);
  }, [selectedOptions]);

  return (
    <div className={classNames(className, 'flex flex-col space-y-4 pb-2')}>
      {options.map((option) => (
        <div key={option.name} className="inline-flex items-center">
          <span
            className={classNames(
              dir === 'ltr' && 'text-right',
              'text-sm text-secondary inline-flex items-center'
            )}
            dir={dir}
          >
            {option.name}
            <Input.Checkbox
              className="ml-2"
              checked={selectedOptions.includes(option)}
              onChange={(value) => {
                if (value)
                  setSelectedOptions((previousSelectedOptions) => {
                    return [...previousSelectedOptions, option];
                  });
                else {
                  setSelectedOptions((previousSelectedOptions) => {
                    return previousSelectedOptions.filter(
                      (selectedOption) => option !== selectedOption
                    );
                  });
                }
              }}
            />
          </span>
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
