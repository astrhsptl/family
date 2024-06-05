import { montserrat, TaskStyles } from '@/shared';
import { TaskHeader, TaskList } from '@/widgets';
import clsx from 'clsx';

interface TaskProps {}

export default async function TaskPage({}: TaskProps) {
  return (
    <div className={clsx(TaskStyles.taskPage, montserrat.className)}>
      <TaskHeader />
      <TaskList />
    </div>
  );
}
