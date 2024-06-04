'use client';

import { BackButton, TaskStyles } from '@/shared';
import { useRouter } from 'next/navigation';

interface TaskHeaderProps {}

export const TaskHeader = ({}: TaskHeaderProps) => {
  const router = useRouter();
  return (
    <header className={TaskStyles.header}>
      <BackButton onClick={() => router.back()} />
      <h1 className={TaskStyles.title}>Todos</h1>
      <div style={{ width: 40 }}></div>
    </header>
  );
};
