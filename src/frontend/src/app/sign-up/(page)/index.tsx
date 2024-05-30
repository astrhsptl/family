'use client';

import { AuthStyles, DefaultButton, DefaultInput } from '@/shared';
import { AuthLayout } from '@/widgets';
import Link from 'next/link';

export default function SignUpLayout() {
  return (
    <>
      <AuthLayout
        title='Sign up'
        description={
          <>
            Already have account?
            <Link href={'/sign-in'} className={AuthStyles.authLink}>
              {' '}
              Go here
            </Link>
          </>
        }
        submit={() => {
          console.log('some');
        }}
      >
        <DefaultInput
          placeholder='First name'
          name='first_name'
          type='text'
          icon='/user.svg'
          registerOptions={{}}
        />
        <DefaultInput
          placeholder='Last name'
          name='last_name'
          type='text'
          icon='/user.svg'
          registerOptions={{}}
        />
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
        <DefaultButton>Sign up</DefaultButton>
      </AuthLayout>
    </>
  );
}
