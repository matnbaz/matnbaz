import { useEffect, useRef } from 'react';

export default function useClickOutside(callback: any, elementId?: string) {
  const callbackRef = useRef<any>(); // initialize mutable ref, which stores callback
  const innerRef = useRef<any>(); // returned to client, who marks "border" element

  // update cb on each render, so second useEffect has access to current value
  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const element = document.getElementById(
      elementId || 'fabric-canvas-wrapper'
    );

    if (!element) return;

    element.addEventListener('mousedown', handleClick);
    return () => element?.removeEventListener('mousedown', handleClick);
    function handleClick(e: any) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
