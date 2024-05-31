import { ReactNode } from 'react';

interface BaseTemplateProps {
  children: ReactNode;
}

export default async function Template({ children }: BaseTemplateProps) {
  return <>{children}</>;
}
