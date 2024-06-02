import { APICore, Family, FamilyCreate, User, UserCreate } from '@/shared';

export const familyRequests = new APICore<Family, FamilyCreate>('family');
export const userRequests = new APICore<User, UserCreate>('user');
