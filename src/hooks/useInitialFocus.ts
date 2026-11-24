import { useEffect, useRef } from 'react';

/**
 * Simple Hook that sets the initial focus to an element.
 *
 * @use
 * const inputRef = useInitialFocus<HTMLInputElement>()
 * return (
 *  ...
 *  <input ... ref={inputRef} />
 *  ...
 * )
 *
 * @return the React.MutableRefObject
 */
const useInitialFocus = <T extends HTMLElement>() => {
  // Track the input to set initial foxus on mount.
  const initialRef = useRef<T | null>(null);

  useEffect(() => {
    if (!initialRef.current) return;

    setTimeout(() => {
      initialRef.current!.focus();
    }, 0);
  }, [initialRef.current]);

  return initialRef;
};

export default useInitialFocus;
