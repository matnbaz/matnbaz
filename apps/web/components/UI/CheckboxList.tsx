import classNames from 'classnames';
import { useEffect, useState } from 'react';
import Input from './Input/Input';
interface IOption {
  id?: string | number;
  name: string;
  key?: string | number;
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
    setSelectedOptions(value);
  }, [value]);

  useEffect(() => {
    if (selectedOptions) onChange(selectedOptions);
  }, [JSON.stringify(selectedOptions)]);

  const compareOptions = (firstOption: IOption, secondOption: IOption) => {
    if (firstOption.key) return firstOption.key === secondOption.key;
    if (firstOption.id) return firstOption.id === secondOption.id;
    return firstOption.name === secondOption.name;
  };

  return (
    <div className={classNames(className, 'flex flex-col space-y-4 pb-2')}>
      {options.map((option) => (
        <div
          key={option.id || option.key || option.name}
          className={classNames(
            dir === 'ltr' && 'text-right',
            'flex items-center flex-row-reverse'
          )}
          dir={dir}
        >
          <Input.Checkbox
            label={option.name}
            checked={selectedOptions.some((selectedOption) =>
              compareOptions(selectedOption, option)
            )}
            onChange={(checked) => {
              if (checked)
                setSelectedOptions((previousSelectedOptions) => {
                  return [...previousSelectedOptions, option];
                });
              else {
                setSelectedOptions((previousSelectedOptions) => {
                  return previousSelectedOptions.filter(
                    (selectedOption) => !compareOptions(selectedOption, option)
                  );
                });
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CheckboxList;
