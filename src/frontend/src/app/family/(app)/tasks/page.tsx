import {
  API_SERVER_URL,
  montserrat,
  PaginatedResult,
  TaskStyles,
} from '@/shared';
import { Task } from '@/shared/model/types/task';
import { TaskHeader, TaskList } from '@/widgets';
import axios from 'axios';
import clsx from 'clsx';

interface TaskProps {}

export default async function TaskPage({}: TaskProps) {
  const tasks = await axios
    .get<PaginatedResult<Task>>(`${API_SERVER_URL}/v1/task/`)
    .then((r) => r.data.data);

  return (
    <div className={clsx(TaskStyles.taskPage, montserrat.className)}>
      <TaskHeader />
      <TaskList tasks={tasks} />
    </div>
  );
}
