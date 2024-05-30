import { AuthApiCore, ISignIn } from '@/shared';

export const useSignIn = async (authData: ISignIn) => {
  const { data } = await AuthApiCore.signIn(authData);
  return data;
};
