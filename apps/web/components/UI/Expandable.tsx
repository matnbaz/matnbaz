import React, { useEffect, useRef, useState } from 'react';
import Button from './Button/Button';

interface IExpandableProps {
  children: React.ReactNode;
  // In pixels
  maxHeight?: number;
}

const Expandable = ({ children, maxHeight = 2400 }: IExpandableProps) => {
  const expandableRef = useRef(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (expandableRef?.current?.clientHeight > maxHeight) setOpen(false);
  }, [expandableRef]);
  return (
    <div
      ref={expandableRef}
      className="relative overflow-hidden"
      style={{ maxHeight: !open && maxHeight }}
    >
      {children}
      {!open && (
        <>
          <div
            className="absolute w-full bottom-0 bg-gradient-to-b from-transparent to-gray-50 dark:to-gray-900 pointer-events-none"
            style={{ height: `${Math.floor(maxHeight / 4)}px` }}
          />
          <Button.Ghost
            className="absolute bottom-5 left-1/2 -translate-x-1/2"
            onClick={() => {
              setOpen((previousOpen) => !previousOpen);
            }}
          >
            بیشتر نشان دادن
          </Button.Ghost>
        </>
      )}
    </div>
  );
};

export default Expandable;
