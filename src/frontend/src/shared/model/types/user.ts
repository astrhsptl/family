import { EntityId } from '../common';

export interface IUserCreate {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  family_id?: string;
}

export type IUserUpdate = Partial<IUserCreate>;

export interface IUser extends IUserCreate, EntityId {}
