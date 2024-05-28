'use client';

import { createContext, useContext } from 'react';
import { IModalContext } from './types';

export const ModalContext = createContext<IModalContext | null>(null);

export const useModalContext = () => {
  const tools = useContext(ModalContext);

  if (tools === null) {
    throw new Error('No current modal context!');
  }

  return tools;
};
