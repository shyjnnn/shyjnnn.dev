import { RefObject, useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(
  isOpen: boolean,
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
): RefObject<T> => {
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return ref;
};

export default useOutsideClick;
