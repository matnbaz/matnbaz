import classNames from 'apps/web/utils/classNames';
import { useRef, useState } from 'react';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { HiChevronDown } from 'react-icons/hi';

interface ICollapsibleProps {
  children: React.ReactNode;
  title?: string;
  open?: boolean;
}

const Collapsible = ({
  children,
  title = 'باز کردن',
  open: initialOpen = false,
}: ICollapsibleProps) => {
  const childrenRef = useRef(null);
  const [open, setOpen] = useState(initialOpen);
  return (
    <div
      ref={childrenRef}
      className={classNames(
        // Can't use open ? "h-auto" : "h-10" since height is not animated/transitioned
        'bg-gray-700 w-full h-auto rounded-lg flex flex-col px-4 pt-2 pb-4 transition-all ease-in-out duration-700 overflow-hidden space-y-4'
      )}
      style={{
        maxHeight: open
          ? childrenRef?.current.parentElement.clientHeight + 30 + 'px'
          : '40px',
      }}
    >
      <button
        className="w-full text-right flex items-center space-x-0.5 space-x-reverse text-gray-700 dark:text-gray-300"
        onClick={() => {
          setOpen((previousOpen) => !previousOpen);
        }}
      >
        <HiChevronDown
          className={classNames(
            open && 'transform rotate-180',
            'fill-current w-4 h-4 transition-all duration-300'
          )}
        />
        <span>{title}</span>
      </button>
      <div>{children}</div>
    </div>
  );
};

export default Collapsible;
