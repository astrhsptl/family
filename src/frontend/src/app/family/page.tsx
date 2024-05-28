import { Header } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Space - Home | Family',
  icons: { icon: '/favicon.svg' },
  description: 'First page',
};

export default async function FamilyPage() {
  return (
    <>
      <Header />
    </>
  );
}
