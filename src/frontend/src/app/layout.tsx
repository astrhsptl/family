import { RootProvider } from '@/features';
import '@/shared/styles/base.css';
import { Header } from '@/widgets';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  manifest: '/manifest.webmanifest',
};

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <head>
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='apple-touch-icon' href='/favicon.svg'></link>
        <meta name='theme-color' content='#fff' />
      </head>
      <body>
        <main>
          <RootProvider>
            <Header />
            {children}
          </RootProvider>
        </main>
      </body>
    </html>
  );
}
