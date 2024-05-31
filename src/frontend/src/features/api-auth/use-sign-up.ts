import { AuthApiCore, ISignUp } from '@/shared';

export const useSignUp = async (authData: ISignUp) => {
  const { data } = await AuthApiCore.signUp(authData);
  return data;
};
