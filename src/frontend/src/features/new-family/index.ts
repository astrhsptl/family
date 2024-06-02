import { CredentialStorage, FamilyCreate, parseJwt } from '@/shared';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';
import { familyRequests, userRequests } from '../requests';

export const createFamily = async (data: FamilyCreate) => {
  const token = CredentialStorage.get('access');

  if (!token) {
    redirect('/sign-in');
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
    family_id: family.data.last_name,
  });

  toast.success('Your family created');

  setTimeout(() => {
    redirect('/family');
  }, 500);
};
