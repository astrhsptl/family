'use client';

import { FC, ReactNode } from 'react';
import StoreProvider from './store-provider';

interface RootProviderProps {
  children: ReactNode;
}

export const RootProvider: FC<RootProviderProps> = ({ children }) => {
  return <StoreProvider>{children}</StoreProvider>;
};
