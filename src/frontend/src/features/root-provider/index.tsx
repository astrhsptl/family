'use client';

import { FC, ReactNode } from 'react';
import StoreProvider from './store-provider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  console.log('all providers successfully loaded');

  return <StoreProvider>{children}</StoreProvider>;
};
