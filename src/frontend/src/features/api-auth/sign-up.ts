import { AuthApiCore, ISignUp } from '@/shared';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { signIn } from './sign-in';

export const signUp = async (authData: ISignUp, router: AppRouterInstance) => {
  const user = await AuthApiCore.signUp(authData).catch(({ message }) => {
    toast.error(message);
    return null;
  });

  if (!user) {
    return;
  }

  return await signIn(
    {
      email: user.data.email,
      password: authData.password,
    },
    router
  );
};
