'use client';

import { useState } from 'react';

export const useClientModalStatement = () => {
  const [modalStatement, setModalStatement] = useState(false);

  return {
    open: () => {
      setModalStatement(() => true);
    },
    close: () => {
      setModalStatement(() => false);
    },
    toggle: () => {
      setModalStatement(() => !modalStatement);
    },
    state: modalStatement,
  };
};
