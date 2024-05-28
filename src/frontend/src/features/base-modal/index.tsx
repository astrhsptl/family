'use client';

import { BaseStyle, ModalContext } from '@/shared';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { ModalTools } from './types';

interface BaseModalProps {
  children: ReactNode;
  className?(isActive: boolean): string;
  tools: ModalTools;
}

export function BaseModal({
  children,
  className,
  tools,
  ...props
}: BaseModalProps) {
  const { toggle, state } = tools;

  return (
    <section
      {...props}
      onMouseUp={(e) => {
        if (e.target === e.currentTarget) {
          toggle();
        }
      }}
      className={
        className
          ? className(state)
          : clsx(BaseStyle.baseModalBackground, state ? BaseStyle.active : '')
      }
    >
      <ModalContext.Provider value={tools}>{children}</ModalContext.Provider>
    </section>
  );
}

export * from './types';
