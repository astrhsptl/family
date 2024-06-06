'use client';

import { DefaultCheckbox, montserrat, Task, TaskStyles } from '@/shared';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { taskRequests } from '../requests';

type TaskRowProps = {
  task?: Task;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
};

export const TaskRow = ({
  task,
  title,
  setTitle,
  ...divProps
}: TaskRowProps) => {
  const [placeholderToggle, setPlaceholderToggle] = useState(title !== '');
  const [deleteFlag, setDeleteFlag] = useState(title === '');
  const [isFinished, setIsFinished] = useState(!task ? false : task.finished);
  const router = useRouter();

  return (
    <div className={TaskStyles.taskRow} {...divProps}>
      <DefaultCheckbox
        disabled={!placeholderToggle}
        onChange={(e) => {
          setIsFinished(!isFinished);
        }}
      />
      <input
        onChange={(e) => {
          if (e.target.value !== '') {
            setDeleteFlag(false);
          }
          setTitle(() => e.target.value);
        }}
        placeholder='Type to add'
        className={clsx(TaskStyles.taskText, montserrat.className)}
        onFocusCapture={() => {
          setPlaceholderToggle(true);
        }}
        onBlur={(e) => {
          setPlaceholderToggle(e.currentTarget.value !== '');
        }}
        value={title}
        onKeyUp={({ key }) => {
          if (!task) {
            return;
          }

          if (task.id === 'unique') {
            return;
          }

          if (key === 'Backspace' && title === '' && deleteFlag) {
            return taskRequests.remove(task.id).then((r) => {
              toast.success('Successful delete');
              router.refresh();
            });
          }
          if (key === 'Backspace' && title === '') {
            setDeleteFlag(true);
            return;
          }
        }}
      />
    </div>
  );
};
