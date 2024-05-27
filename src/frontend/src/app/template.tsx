import { RootProvider } from '@/features';
import { FC, ReactNode, Suspense } from 'react';
import Loading from './loading';

interface DefaultTemplateProps {
  children: ReactNode;
}

const DefaultTemplateTemplate: FC<DefaultTemplateProps> = ({ children }) => {
  return (
    <Suspense fallback={<Loading />}>
      <RootProvider>{children}</RootProvider>
    </Suspense>
  );
};

export default DefaultTemplateTemplate;
