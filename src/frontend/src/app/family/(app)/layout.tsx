import { NavigationPanel } from '@/widgets/navigation-panel';

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
