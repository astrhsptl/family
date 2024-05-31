'use client';

import { signIn } from '@/features';
import { AuthStyles, DefaultButton, DefaultInput, ISignIn } from '@/shared';
import { useEmailRegex } from '@/shared/lib/hooks/use-email-regex';
import { AuthLayout } from '@/widgets';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';

export default function SignInLayout() {
  const router = useRouter();
  const emailRegex = useEmailRegex();

  return (
    <>
      <AuthLayout
        title='Login'
        description={
          <>
            You are new?{' '}
            <Link href={'/sign-up'} className={AuthStyles.authLink}>
              Create new
            </Link>
          </>
        }
        submit={((data) => signIn(data, router)) as SubmitHandler<ISignIn>}
      >
        <DefaultInput
          placeholder='Email'
          name='email'
          type='email'
          icon='/mail.svg'
          registerOptions={{
            required: {
              message: 'Email are required',
              value: true,
            },
            pattern: {
              message: 'Invalid email',
              value: emailRegex,
            },
          }}
        />
        <DefaultInput
          placeholder='Password'
          name='password'
          type='password'
          icon='/lock.svg'
          registerOptions={{
            required: {
              message: 'Password are required',
              value: true,
            },
            minLength: {
              message: 'Minimal length 8',
              value: 8,
            },
          }}
        />
        <DefaultButton>Sign in</DefaultButton>
      </AuthLayout>
    </>
  );
}
