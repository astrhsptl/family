'use client';

import { AuthApiCore, CredentialStorage } from '@/shared';

export const checkAuth = async () => {
  const checkUserByToken = async (token: string) => {
    const user = await AuthApiCore.userByToken(token).catch(() => null);
    return user;
  };

  const access = CredentialStorage.get('access');
  const refresh = CredentialStorage.get('refresh');

  if ((!access && !refresh) || !refresh) {
    return null;
  }

  if (!access) {
    const newAccess = await AuthApiCore.refresh({
      refresh: refresh,
    }).catch(() => null);

    if (newAccess === null) {
      return null;
    }

    CredentialStorage.set('access', newAccess.data.access);

    return await checkUserByToken(newAccess.data.access);
  }

  return await checkUserByToken(access);
};
