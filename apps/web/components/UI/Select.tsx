import { Fragment, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { AiOutlineCheck, AiOutlineSelect } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';
import classNames from 'classnames';

interface IOption {
  name: string;
  value: any;
}

type TValue = IOption;

interface ISelectProps {
  options: IOption[];
  value?: TValue;
  onChange?: (newValue: TValue) => void;
}

const Select = ({ options, value = null, onChange }: ISelectProps) => {
  const [selectedOption, setSelectedOption] = useState(value);

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <Listbox
      as="div"
      className="relative inline-block text-left z-10 w-full"
      value={selectedOption}
      onChange={(newValue) => {
        if (onChange) onChange(newValue);
        setSelectedOption(newValue);
      }}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            className={classNames(
              selectedOption
                ? 'text-gray-700 dark:text-gray-100'
                : 'text-secondary',
              'inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white/80 dark:border-gray-600/60 dark:bg-gray-700/60 backdrop-blur-sm text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500'
            )}
          >
            <span>{selectedOption?.name || 'انتخاب کنید...'}</span>
            <HiChevronDown
              className="-ml-1 mr-2 h-5 w-5 flex-shrink-0"
              aria-hidden="true"
            />
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Listbox.Options
              static
              className="origin-top-right absolute z-40 right-0 px-2 py-2 mt-2 w-56 rounded-md shadow-lg bg-white/20 dark:bg-gray-600/20 backdrop-blur-md ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div className="py-1 space-y-2">
                {options.map((option) => (
                  /* Use the `active` state to conditionally style the active option. */
                  /* Use the `selected` state to conditionally style the selected option. */
                  <Listbox.Option
                    key={option.name}
                    value={option}
                    className={({ active, selected }) =>
                      `${
                        active
                          ? !selected &&
                            'bg-primary-400/30 dark:bg-primary-500/30'
                          : 'text-gray-900 dark:text-gray-100'
                      }
                      ${selected && 'bg-primary-400 dark:bg-primary-500'}
                          cursor-pointer select-none relative py-2 pl-10 pr-4 text-right rounded-md`
                    }
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`${
                            selected ? 'font-medium' : 'font-normal'
                          } block truncate`}
                        >
                          {option.name}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-900 dark:text-gray-100">
                            <AiOutlineCheck
                              className="w-5 h-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default Select;
