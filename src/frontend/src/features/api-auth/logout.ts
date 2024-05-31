import { CredentialStorage } from '@/shared';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';

export const logout = (router: AppRouterInstance) => {
  CredentialStorage.invalidate();
  toast.success('Successful logout!');
  setTimeout(() => {
    router.push('/sign-in');
  }, 1000);
};
