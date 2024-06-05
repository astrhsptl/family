'use client';

import { TaskRow } from '@/features';
import { taskRequests } from '@/features/requests';
import { Task, useDebounceValue } from '@/shared';
import { useEffect, useState } from 'react';

interface CreatedTaskProps {
  task: Task;
}

export const CreatedTask = ({ task }: CreatedTaskProps) => {
  const [title, setTitle] = useState(task.title);
  const updatedTitle = useDebounceValue(title);

  useEffect(() => {
    if (updatedTitle !== task.title) {
      taskRequests.update(task.id, { title: updatedTitle });
    }
  }, [updatedTitle]);

  return <TaskRow key={task.id} title={title} setTitle={setTitle} />;
};
