import { Listbox, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';

interface Options {
  name: string;
  color?: string;
  value: string;
}

type TValue = Options[];

export interface MultiSelectProps {
  options: Options[];
  value?: TValue;
  onChange?: (values: TValue) => void;
}

export const MultiSelectWIP = ({
  options,
  value,
  onChange,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<TValue | null>(null);
  const optionChangeHandler = (selectedOption) => {
    if (selectedOptions?.includes(selectedOption)) return;
    setSelectedOptions((previousSelectedOptions) => [
      // Since previous state might be null, we provide an empty array if previous state is null
      ...(previousSelectedOptions || []),
      selectedOption,
    ]);
  };
  const removeSelectedOption = (option) => {
    setSelectedOptions((previousSelectedOptions) =>
      previousSelectedOptions.filter(
        (previousSelectedOption) =>
          previousSelectedOption.value !== option.value
      )
    );
  };
  useEffect(() => {
    if (selectedOptions) onChange(selectedOptions);
  }, [selectedOptions]);
  return (
    <Listbox
      as="div"
      className="relative inline-block text-left z-10 w-full"
      value={value}
      onChange={optionChangeHandler}
    >
      {({ open }) => (
        <>
          <div>
            <Listbox.Button className="inline-flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-100 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500">
              <>
                <div className="flex flex-wrap space-x-2 space-x-reverse space-y-2 items-center">
                  {selectedOptions ? (
                    selectedOptions.map((selectedOption) => (
                      <button
                        key={selectedOption.value}
                        onClick={() => {
                          removeSelectedOption(selectedOption);
                        }}
                        className={classNames(
                          !selectedOption.color && 'bg-primary-500',
                          'flex flex-grow-0 h-6 items-center justify-center rounded-full px-1.5 py-0.5 text-xs'
                        )}
                        style={{ backgroundColor: selectedOption.color }}
                      >
                        <AiOutlineClose
                          className="ml-1 h-3 w-3"
                          aria-hidden="true"
                        />
                        {selectedOption.name}
                      </button>
                    ))
                  ) : (
                    <span className="opacity-50 pointer-events-none">
                      انتخاب کنید...
                    </span>
                  )}
                </div>

                <HiChevronDown
                  className="-ml-1 mr-2 h-5 w-5 flex-shrink-0"
                  aria-hidden="true"
                />
              </>
            </Listbox.Button>
          </div>

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
              onChange={optionChangeHandler}
              static
              className="origin-top-right absolute right-0 px-2 py-2 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
            >
              <div className="py-1">
                {options.map((option) => (
                  <Listbox.Option key={option.value} value={option}>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? 'bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100'
                            : 'text-gray-700 dark:text-gray-300',
                          selectedOptions?.includes(option) &&
                            '!text-green-500',
                          'group flex items-center px-4 py-2 mt-1 text-sm rounded-lg'
                        )}
                      >
                        {option.color && (
                          <div
                            className="ml-3 h-5 w-5 rounded-full"
                            style={{ backgroundColor: option.color }}
                          />
                        )}
                        {option.name}
                      </a>
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
