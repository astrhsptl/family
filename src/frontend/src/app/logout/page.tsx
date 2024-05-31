import { Metadata } from 'next';
import LogoutLayout from './(page)';

export const metadata: Metadata = {
  title: 'Logout | Family Space',
  icons: { icon: '/favicon.svg' },
  description: 'Family space logout page',
};

export default async function Logout() {
  return (
    <>
      <LogoutLayout />
    </>
  );
}
