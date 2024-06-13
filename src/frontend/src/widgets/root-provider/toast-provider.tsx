'use client';
import { BaseStyle, montserrat } from '@/shared';
import clsx from 'clsx';
import { Toaster } from 'react-hot-toast';

export default function ToastProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          className: clsx(BaseStyle.toastStyles, montserrat.className),
          style: {
            color: 'var(--c-white)',
            backgroundColor: 'var(--c-dark-gray)',
          },
        }}
        position='bottom-center'
      />
    </>
  );
}
