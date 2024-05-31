import { ReactNode } from 'react';

interface SomeProps {
  children: ReactNode;
}

export default function SomeTemplate({ children }: SomeProps) {
  return <>{children}</>;
}
