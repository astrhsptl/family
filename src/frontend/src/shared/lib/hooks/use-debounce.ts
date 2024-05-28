'use client';

import { useEffect } from 'react';

export const useDebounceValue = <T>(cb: () => void, value: T) => {
  useEffect(() => {
    const timeoutId = setTimeout(cb, 500);
    return () => clearTimeout(timeoutId);
  }, [value, cb]);

  return value;
};
