import { RootProvider } from '@/features';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body>
        <RootProvider>
          <div id='root'>{children}</div>
        </RootProvider>
      </body>
    </html>
  );
}
