import { ReactNode } from 'react';

interface BaseTemplateProps {
  children: ReactNode;
}

export default function Template({ children }: BaseTemplateProps) {
  return <>{children}</>;
}