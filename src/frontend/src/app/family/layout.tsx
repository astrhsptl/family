import '@/shared/styles/base.css';
import { Metadata } from 'next';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  manifest: '/manifest.json',
};

export default async function Layout({ children }: RootLayoutProps) {
  return <main>{children}</main>;
}
