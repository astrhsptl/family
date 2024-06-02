import { Header, NewFamilyLayout } from '@/widgets';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'New family | Family Space',
  icons: { icon: '/favicon.svg' },
  description: 'Family space create new family',
};

export default async function NewFamily() {
  return (
    <>
      <Header />
      <NewFamilyLayout />
    </>
  );
}
