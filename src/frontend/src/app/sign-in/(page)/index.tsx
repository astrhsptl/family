'use client';

import { AuthStyles, DefaultButton, DefaultInput } from '@/shared';
import { AuthLayout } from '@/widgets';
import Link from 'next/link';

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
