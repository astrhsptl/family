import '@/shared/styles/base.css';
import { Metadata } from 'next';

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
        <main>{children}</main>
      </body>
    </html>
  );
}
