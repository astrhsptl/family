'use client';

import { signUp } from '@/features';
import { AuthStyles, DefaultButton, DefaultInput, ISignUp } from '@/shared';
import { useEmailRegex } from '@/shared/lib/hooks/use-email-regex';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler } from 'react-hook-form';
import { AuthLayout } from './ui';

export function SignUpLayout() {
  const router = useRouter();
  const emailRegex = useEmailRegex();

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
        submit={((data) => signUp(data, router)) as SubmitHandler<ISignUp>}
      >
        <DefaultInput
          placeholder='First name'
          name='first_name'
          type='text'
          icon='/user.svg'
          registerOptions={{
            required: {
              message: 'First name are required',
              value: true,
            },
          }}
        />
        <DefaultInput
          placeholder='Last name'
          name='last_name'
          type='text'
          icon='/user.svg'
          registerOptions={{
            required: {
              message: 'Last name are required',
              value: true,
            },
          }}
        />
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
        <DefaultButton>Sign up</DefaultButton>
      </AuthLayout>
    </>
  );
}
