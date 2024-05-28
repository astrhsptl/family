import { RootProvider } from '@/features';
import '@/shared/styles/base.css';
import { Header } from '@/widgets';
import { Metadata } from 'next';
import { Suspense } from 'react';
import Loading from './loading';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.json' />
        <link rel='apple-touch-icon' href='/favicon.svg'></link>
        <meta name='theme-color' content='#fff' />
      </head>
      <body>
        <main>
          <RootProvider>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </RootProvider>
        </main>
      </body>
    </html>
  );
}
