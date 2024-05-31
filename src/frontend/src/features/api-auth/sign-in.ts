import { AuthApiCore, CredentialStorage, ISignIn } from '@/shared';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';

export const signIn = async (authData: ISignIn, router: AppRouterInstance) => {
  const data = await AuthApiCore.signIn(authData).catch(({ message }) => {
    toast.error(message);
    return null;
  });

  if (!data) {
    return;
  }

  for (const [key, value] of Object.entries(data.data)) {
    CredentialStorage.set(key, value);
  }

  toast.success('Successful sign in');
  setTimeout(() => router.push('/family'), 1000);
};
