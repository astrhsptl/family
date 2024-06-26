import { NavigationPanel } from '@/widgets';

interface LayoutProps {
  children: React.ReactNode;
}
export default async function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <NavigationPanel />
    </>
  );
}
