import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logout | Family Space',
  icons: { icon: '/favicon.svg' },
  description: 'Family space logout page',
};

export default async function Logout() {
  return (
    <>
      <div>logout</div>
    </>
  );
}
