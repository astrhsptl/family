'use client';

import { Task, taskActions } from '@/entities';
import { useAppDispatch, useDebounceValue } from '@/shared';
import { useEffect, useState } from 'react';
import { TaskRow } from './task-row';

interface CreatedTaskProps {
  task: Task;
}

export const CreatedTask = ({ task }: CreatedTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const dispatch = useAppDispatch();
  const updatedTitle = useDebounceValue(title);

  useEffect(() => {
    if (updatedTitle !== task.title && updatedTitle !== '') {
      dispatch(
        taskActions.update({ id: task.id, data: { title: updatedTitle } })
      );
    }
  }, [updatedTitle]);

  return <TaskRow task={task} title={title} setTitle={setTitle} />;
};
