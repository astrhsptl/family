'use client';

import { TaskStyles } from '@/shared';
import { Task } from '@/shared/model/types/task';
import { TaskRow } from './ui';
import { createdTask } from './ui/created-task';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return (
    <section className={TaskStyles.taskList}>
      {tasks?.map((task) => createdTask(task, TaskRow))}
    </section>
  );
};
