'use client';

import { TaskRow } from '@/features';
import { taskRequests } from '@/features/requests';
import { useDebounceValue } from '@/shared';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface NewTaskProps {}

export const NewTask = ({}: NewTaskProps) => {
  const [title, setTitle] = useState('');
  const debouncedTitle = useDebounceValue(title);
  const router = useRouter();

  useEffect(() => {
    if (debouncedTitle !== '') {
      taskRequests
        .create({ title: title, finish_date: new Date().toISOString() })
        .then(() => {
          toast.success('Task saved');
          setTitle('');
          router.refresh();
        });
    }
  }, [debouncedTitle]);

  return (
    <TaskRow key={'unique'} id={'unique'} title={title} setTitle={setTitle} />
  );
};
