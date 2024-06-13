'use client';

import { setFamily, setUser } from '@/entities';
import { checkAuth } from '@/features';
import { familyRequests } from '@/features/requests';
import { useAppDispatch } from '@/shared';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default function AuthTemplate({ children }: AuthTemplateProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    checkAuth().then((user) => {
      if (!user) {
        return router.push('/sign-in');
      }
      if (!user.data.family_id) {
        return router.push('/family/new');
      }
      familyRequests
        .fetchByID(user.data.family_id)
        .then(({ data }) => {
          dispatch(setFamily(data));
        })
        .catch(() => null);
      dispatch(setUser(user.data));
    });
  }, []);

  return <>{children}</>;
}
