'use client';

import { taskRequests } from '@/features/requests';
import { useDebounceValue } from '@/shared';
import { useEffect, useState } from 'react';

interface NewTaskProps {}
export const NewTask = ({}: NewTaskProps) => {
  const [title, setTitle] = useState('');
  const updatedTitle = useDebounceValue(title);

  useEffect(() => {
    if (updatedTitle !== '') {
      taskRequests.create({ title: updatedTitle });
    }
  }, [updatedTitle]);

  return <></>;
};
