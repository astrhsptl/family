import { Metadata } from 'next';
import SignInLayout from './(page)';

export const metadata: Metadata = {
  title: 'Sign in | Family Space',
  icons: { icon: '/favicon.svg' },
  description: 'Family space sign in page',
};

export default function SignIn() {
  return (
    <>
      <SignInLayout />
    </>
  );
}
