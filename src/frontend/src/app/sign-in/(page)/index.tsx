'use client';

import { useSignIn } from '@/features/api-auth';
import { AuthStyles, DefaultButton, DefaultInput } from '@/shared';
import { AuthLayout } from '@/widgets';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function SignInLayout() {
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
        submit={(data) => {
          console.log(data);
          useSignIn(data).finally(() => toast.success('asdf'));
        }}
      >
        <DefaultInput
          placeholder='Email'
          name='email'
          type='email'
          icon='/mail.svg'
          registerOptions={{}}
        />
        <DefaultInput
          placeholder='Password'
          name='password'
          type='password'
          icon='/lock.svg'
          registerOptions={{}}
        />
        <DefaultButton>Sign in</DefaultButton>
      </AuthLayout>
    </>
  );
}
