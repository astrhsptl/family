import { Metadata } from 'next';
import SignUpLayout from './(page)';

export const metadata: Metadata = {
  title: 'Sign up | Family Space',
  icons: { icon: '/favicon.svg' },
  description: 'Family space sign up page',
};

export default function SignUp() {
  return (
    <>
      <SignUpLayout />
    </>
  );
}
