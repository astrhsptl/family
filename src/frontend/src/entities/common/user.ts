import { EntityId } from '@/shared';

export interface UserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  family_id?: string;
}

export type IUserUpdate = Partial<UserCreate>;

export interface User extends UserCreate {
  id: EntityId;
}
