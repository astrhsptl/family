import { EntityId } from '@/shared';

export interface TaskCreate {
  title: string;
  description?: string;
  is_finished?: boolean;
  created_date?: string;
  finish_date?: string;
  user_id?: string;
  family_id?: string;
  event_id?: string;
}

export type TaskUpdate = Partial<TaskCreate>;

export interface Task extends TaskCreate {
  id: EntityId;
  is_finished: boolean;
}
