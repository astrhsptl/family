import { CredentialStorage, FamilyCreate, parseJwt } from '@/shared';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import toast from 'react-hot-toast';
import { familyRequests, userRequests } from '../requests';

export const createFamily = async (
  data: FamilyCreate,
  router: AppRouterInstance
) => {
  const token = CredentialStorage.get('access');

  if (!token) {
    return router.push('/sign-in');
  }

  const payload = parseJwt(token);
  const family = await familyRequests.create(data).catch((e) => {
    toast.error(e);
    return null;
  });

  if (!family) {
    return;
  }

  userRequests.update(payload.sub, {
    family_id: family.data.id as string,
  });

  toast.success('Your family created');

  setTimeout(() => {
    router.push('/family');
  }, 500);
};
