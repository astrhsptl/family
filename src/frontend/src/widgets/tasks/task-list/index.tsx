'use client';

import { taskRequests } from '@/features/requests';
import { TaskStyles } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { TaskRow } from './ui';

interface TaskListProps {}

export const TaskList = ({}: TaskListProps) => {
  const { data } = useQuery({
    queryFn: async () => taskRequests.fetchAll().then((r) => r.data.data),
    queryKey: ['tasks'],
  });

  return (
    <section className={TaskStyles.taskList}>
      {data?.map((task, index) => (
        <TaskRow key={index} title={task.title} />
      ))}
      <TaskRow />
    </section>
  );
};
