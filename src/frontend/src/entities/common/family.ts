import { EntityId } from '@/shared';

export interface FamilyCreate {
  last_name: string;
}

export interface Family extends FamilyCreate {
  id: EntityId;
}
export type FamilyUpdate = Partial<FamilyCreate>;
