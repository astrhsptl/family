'use client';
import { AppStore, store } from '@/entities';
import { useRef } from 'react';
import { Provider } from 'react-redux';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  storeRef.current = store;

  return <Provider store={storeRef.current}>{children}</Provider>;
}
