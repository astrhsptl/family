'use server';

import { checkAuth } from '@/features';
import { redirect } from 'next/navigation';

interface AuthTemplateProps {
  children: React.ReactNode;
}

export default async function AuthTemplate({ children }: AuthTemplateProps) {
  const user = await checkAuth();

  if (!user) {
    return redirect('/sign-in');
  }

  console.log(user.data);

  if (!user.data.family_id) {
    return redirect('/family/new');
  }
  return <>{children}</>;
}
