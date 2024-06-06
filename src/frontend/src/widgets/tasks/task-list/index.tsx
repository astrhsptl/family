'use server';

import { API_SERVER_URL, PaginatedResult, TaskStyles } from '@/shared';
import { Task } from '@/shared/model/types/task';
import axios from 'axios';
import { CreatedTask } from './ui';
import { NewTask } from './ui/new-task';

interface TaskListProps {}

export const TaskList = async ({}: TaskListProps) => {
  const tasks = await axios
    .get<PaginatedResult<Task>>(`${API_SERVER_URL}/v1/task/`)
    .then((r) => r.data.data);

  return (
    <section className={TaskStyles.taskList}>
      {tasks?.map((task) => (
        <CreatedTask key={task.id} task={task} />
      ))}
      <NewTask />
    </section>
  );
};
