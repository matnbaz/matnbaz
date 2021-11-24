import { Disclosure, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { HiChevronDown, HiChevronUp } from 'react-icons/hi';
import Divider from './Divider';

interface ICollapsibleProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  open?: boolean;
  onClick?: () => void;
}

const Collapsible = ({
  children,
  title = 'باز کردن',
  className,
  open: initialOpen = false,
  ...props
}: ICollapsibleProps) => {
  return (
    <Disclosure
      {...props}
      as="div"
      defaultOpen={initialOpen}
      className={classNames(
        className,
        'w-full h-auto rounded-lg flex flex-col px-4 pt-2 pb-4 transition-transform ease-in-out duration-700 space-y-2'
      )}
    >
      {({ open }) => (
        <>
          <Disclosure.Button className="flex justify-between w-full pt-2 text-sm font-medium text-left focus:outline-none focus-visible:ring focus-visible:ring-primary-500 focus-visible:ring-opacity-75">
            <span>{title}</span>
            <HiChevronDown
              className={`${
                open ? 'transform rotate-180' : ''
              } w-5 h-5 text-secondary`}
            />
          </Disclosure.Button>
          <Transition
            show={open}
            enter="transition duration-400 ease-in-out"
            enterFrom="transform opacity-0"
            enterTo="transform opacity-100"
            leave="transition duration-400 ease-in-out"
            leaveFrom="transform opacity-100"
            leaveTo="transform opacity-0"
          >
            <Disclosure.Panel>
              <div className="space-y-4">
                <Divider />
                <div>{children}</div>
              </div>
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default Collapsible;
