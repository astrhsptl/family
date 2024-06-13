'use client';

import { currentTasks, Task, taskActions } from '@/entities';
import { TaskStyles, useAppDispatch, useAppSelector } from '@/shared';
import { useEffect } from 'react';
import { CreatedTask, NewTask } from './ui';

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  const storeTasks = useAppSelector(currentTasks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(taskActions.loads(tasks));
  }, []);

  return (
    <section className={TaskStyles.taskList}>
      {storeTasks.tasks?.map((task) => (
        <CreatedTask key={task.id} task={task} />
      ))}
      <NewTask />
    </section>
  );
};
