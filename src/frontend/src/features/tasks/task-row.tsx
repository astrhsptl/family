'use client';

import { DefaultCheckbox, montserrat, TaskStyles } from '@/shared';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';

interface TaskRowProps {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export const TaskRow = ({ title, setTitle }: TaskRowProps) => {
  const [placeholderToggle, setPlaceholderToggle] = useState(false);

  return (
    <div className={TaskStyles.taskRow}>
      <DefaultCheckbox disabled={!placeholderToggle} />
      <input
        onChange={(e) => setTitle(() => e.target.value)}
        placeholder='Type to add'
        className={clsx(TaskStyles.taskText, montserrat.className)}
        onFocusCapture={() => {
          setPlaceholderToggle(true);
        }}
        onBlur={(e) => {
          setPlaceholderToggle(e.currentTarget.value !== '');
        }}
        value={title}
      />
    </div>
  );
};
