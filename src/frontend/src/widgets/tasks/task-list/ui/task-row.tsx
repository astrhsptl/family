'use client';

import {
  DefaultCheckbox,
  montserrat,
  TaskStyles,
  useDebounceValue,
} from '@/shared';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

interface TaskRowProps {
  title?: string;
}

export const TaskRow = ({ title }: TaskRowProps) => {
  const [placeholderToggle, setPlaceholderToggle] = useState(false);
  const [task, setTask] = useState(title);
  const text = useDebounceValue(task);

  useEffect(() => {
    console.log(text);
  }, [text]);

  return (
    <div className={TaskStyles.taskRow}>
      <DefaultCheckbox disabled={!placeholderToggle} />
      <input
        onChange={(e) => setTask(() => e.target.value)}
        placeholder='Type to add'
        className={clsx(TaskStyles.taskText, montserrat.className)}
        onFocusCapture={() => {
          setPlaceholderToggle(true);
        }}
        onBlur={(e) => {
          setPlaceholderToggle(e.currentTarget.value !== '');
        }}
      />
    </div>
  );
};
