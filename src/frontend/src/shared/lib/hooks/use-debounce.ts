'use client';

import { useEffect, useState } from 'react';

export const useDebounceValue = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return debouncedValue;
};
