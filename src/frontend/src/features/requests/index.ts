import {
  Family,
  FamilyCreate,
  Task,
  TaskCreate,
  User,
  UserCreate,
} from '@/entities';
import { APICore } from '@/shared';

export const familyRequests = new APICore<Family, FamilyCreate>('family');
export const userRequests = new APICore<User, UserCreate>('user');
export const taskRequests = new APICore<Task, TaskCreate>('task');
