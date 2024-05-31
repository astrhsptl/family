import { AuthApiCore } from '@/shared';
import { cookies } from 'next/headers';

export const checkAuth = async () => {
  const storage = cookies();
  const checkUserByToken = async (token: string) => {
    const user = await AuthApiCore.userByToken(token).catch(() => null);
    return user;
  };

  const access = storage.get('access');
  const refresh = storage.get('refresh');

  if ((!access && !refresh) || !refresh) {
    return null;
  }

  if (!access) {
    const newAccess = await AuthApiCore.refresh({
      refresh: refresh.value,
    }).catch(() => null);

    if (newAccess === null) {
      return null;
    }

    storage.set('access', newAccess.data.access);

    return await checkUserByToken(newAccess.data.access);
  }

  return await checkUserByToken(access.value);
};
