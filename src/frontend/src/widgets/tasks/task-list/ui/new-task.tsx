'use client';

import { createTask } from '@/entities';
import { useAppDispatch, useDebounceValue } from '@/shared';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { TaskRow } from './task-row';

interface NewTaskProps {}

export const NewTask = ({}: NewTaskProps) => {
  const [title, setTitle] = useState('');
  const debouncedTitle = useDebounceValue(title, 1000);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (debouncedTitle !== '') {
      dispatch(
        createTask({ title: title, finish_date: new Date().toISOString() })
      ).then(() => {
        toast.success('Task saved');
        setTitle('');
      });
    }
  }, [debouncedTitle]);

  return <TaskRow title={title} setTitle={setTitle} />;
};
