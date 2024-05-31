import { checkAuth } from '@/features/api-auth/check-auth';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Space | Family',
  icons: { icon: '/favicon.svg' },
  description: 'Family page',
};

export default async function Page() {
  const user = await checkAuth();

  if (!user) {
    return redirect('/sign-in');
  }

  return <div></div>;
}
