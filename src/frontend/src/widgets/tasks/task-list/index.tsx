'use client';

import { TaskStyles } from '@/shared';
import { Task } from '@/shared/model/types/task';
import { CreatedTask } from './ui';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <section className={TaskStyles.taskList}>
      {tasks?.map((task) => (
        <CreatedTask key={task.id} task={task} />
      ))}
    </section>
  );
};
