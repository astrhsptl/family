import { EntityId } from '../common';

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

export type ITaskUpdate = Partial<TaskCreate>;

export interface Task extends TaskCreate {
  id: EntityId;
}
