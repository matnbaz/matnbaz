import classNames from 'classnames';
import { Input } from './Input/Input';
interface Option {
  value: string | number;
  name?: string;
  key?: string | number;
}
export interface CheckboxListProps {
  options: Option[];
  value?: Option[];
  className?: string;
  onChange?: (values: Option[]) => void;
  search?: string;
}

const compareOptions = (firstOption: Option, secondOption: Option) => {
  return firstOption.value === secondOption.value;
};

export const CheckboxList = ({
  options,
  value = [],
  className,
  search,
  onChange,
}: CheckboxListProps) => {
  return (
    <div className={classNames(className, 'flex flex-col pb-2')}>
      {options.map((option) => (
        <div
          key={option.value || option.key || option.name}
          className={classNames(
            typeof search !== 'undefined' &&
              !option.name.toLowerCase().includes(search.toLowerCase()) &&
              'hidden',
            'flex items-center ltr:text-left rtl:text-right my-2'
          )}
        >
          <Input.Checkbox
            label={option.name}
            checked={value.some((selectedOption) =>
              compareOptions(selectedOption, option)
            )}
            onChange={(checked) => {
              if (checked) onChange([...value, option]);
              else
                onChange([
                  ...value.filter((item) => !compareOptions(item, option)),
                ]);
            }}
          />
        </div>
      ))}
    </div>
  );
};
