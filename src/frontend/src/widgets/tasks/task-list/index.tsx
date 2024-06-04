'use client';

import { TaskStyles } from '@/shared';
import { TaskRow } from './ui';

interface TaskListProps {}

export const TaskList = ({}: TaskListProps) => {
  return (
    <section className={TaskStyles.taskList}>
      <TaskRow />
    </section>
  );
};
