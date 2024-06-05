'use client';

import { taskRequests } from '@/features/requests';
import { Task, useDebounceValue } from '@/shared';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';

export const createdTask = (
  task: Task,
  Component: FC<{
    title: string;
    setTitle: Dispatch<SetStateAction<string>>;
  }>
) => {
  const [title, setTitle] = useState(task.title);
  const updatedTitle = useDebounceValue(title);

  useEffect(() => {
    if (updatedTitle !== task.title) {
      taskRequests.update(task.id, { title: updatedTitle });
    }
  }, [updatedTitle]);

  return <Component key={task.id} title={title} setTitle={setTitle} />;
};
