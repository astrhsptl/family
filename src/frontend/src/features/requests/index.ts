import { APICore, Family, FamilyCreate, User, UserCreate } from '@/shared';
import { Task, TaskCreate } from '@/shared/model/types/task';

export const familyRequests = new APICore<Family, FamilyCreate>('family');
export const userRequests = new APICore<User, UserCreate>('user');
export const taskRequests = new APICore<Task, TaskCreate>('task');
