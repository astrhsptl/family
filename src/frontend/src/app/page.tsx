import Some from '@/widgets/some';
import { Metadata } from 'next';
import { FC, Suspense } from 'react';
import Loading from './loading';

export const metadata: Metadata = {
  title: 'suck my big penis',
  icons: { icon: '/favicon.svg' },
  description: 'First page',
};

const HomePage: FC = () => {
  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Some />
      </Suspense>
    </main>
  );
};

export default HomePage;
