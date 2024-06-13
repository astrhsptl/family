import { Task } from '@/entities';
import {
  API_SERVER_URL,
  montserrat,
  PaginatedResult,
  TaskStyles,
} from '@/shared';
import { TaskHeader, TaskList } from '@/widgets';
import axios from 'axios';
import clsx from 'clsx';

interface TaskProps {}

export default async function TaskPage({}: TaskProps) {
  const tasks = await axios
    .get<PaginatedResult<Task>>(`${API_SERVER_URL}/v1/task/`, {
      params: {
        order_by: 'created_date',
      },
    })
    .then((r) => r.data.data);

  return (
    <div className={clsx(TaskStyles.taskPage, montserrat.className)}>
      <TaskHeader />
      <TaskList tasks={tasks} />
    </div>
  );
}
