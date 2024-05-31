'use client';

import { logout } from '@/features';
import { DefaultButton } from '@/shared';
import { AuthLayout } from '@/widgets';
import { useRouter } from 'next/navigation';

export default function LogoutLayout() {
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
