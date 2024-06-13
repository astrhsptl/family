'use client';

import { changeStatus, removeTask, Task } from '@/entities';
import {
  DefaultCheckbox,
  montserrat,
  TaskStyles,
  useAppDispatch,
} from '@/shared';
import clsx from 'clsx';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';

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
  const dispatch = useAppDispatch();
  const [placeholderToggle, setPlaceholderToggle] = useState(title !== '');
  const [deleteFlag, setDeleteFlag] = useState(title === '');

  return (
    <div className={TaskStyles.taskRow} {...divProps}>
      <DefaultCheckbox
        disabled={!placeholderToggle}
        checked={task?.is_finished}
        onChange={() => {
          if (!task) {
            return;
          }
          return dispatch(changeStatus(task.id)).then(() => {
            toast.success(task.is_finished ? 'Opened' : 'Closed');
          });
        }}
      />
      <input
        placeholder='Type to add'
        value={title}
        disabled={task?.is_finished}
        className={clsx(
          TaskStyles.taskText,
          montserrat.className,
          task?.is_finished ? TaskStyles.finished : ''
        )}
        onChange={(e) => {
          if (e.target.value !== '') {
            setDeleteFlag(false);
          }
          setTitle(() => e.target.value);
        }}
        onFocusCapture={() => {
          setPlaceholderToggle(true);
        }}
        onBlur={(e) => {
          setPlaceholderToggle(e.currentTarget.value !== '');
        }}
        onKeyUp={({ key }) => {
          if (!task || task.id === 'unique') {
            return;
          }

          if (key === 'Backspace' && title === '' && deleteFlag) {
            return dispatch(removeTask(task.id)).then(() => {
              toast.success('Successful delete');
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
