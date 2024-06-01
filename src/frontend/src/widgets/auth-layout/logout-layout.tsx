'use client';

import { logout } from '@/features';
import { DefaultButton } from '@/shared';
import { useRouter } from 'next/navigation';
import { AuthLayout } from './ui';

export function LogoutLayout() {
  const router = useRouter();

  return (
    <>
      <AuthLayout
        title='Logout'
        description={<></>}
        submit={() => logout(router)}
      >
        <DefaultButton>Maybe not?</DefaultButton>
      </AuthLayout>
    </>
  );
}
