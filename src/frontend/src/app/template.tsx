import { RootProvider } from '@/features';
import { ReactNode, Suspense } from 'react';
import Loading from './loading';

interface DefaultTemplateProps {
  children: ReactNode;
}

export default async function DefaultTemplateTemplate({
  children,
}: DefaultTemplateProps) {
  return (
    <Suspense fallback={<Loading />}>
      <RootProvider>{children}</RootProvider>
    </Suspense>
  );
}
