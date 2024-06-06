'use client';

import { DefaultCheckbox, EntityId, montserrat, TaskStyles } from '@/shared';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import toast from 'react-hot-toast';
import { taskRequests } from '../requests';

type TaskRowProps = {
  id: EntityId;
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
} & JSX.IntrinsicElements['div'];

export const TaskRow = ({ id, title, setTitle, ...divProps }: TaskRowProps) => {
  const [placeholderToggle, setPlaceholderToggle] = useState(false);
  const [deleteFlag, setDeleteFlag] = useState(title === '');
  const router = useRouter();

  return (
    <div className={TaskStyles.taskRow} {...divProps}>
      <DefaultCheckbox disabled={!placeholderToggle} />
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
          if (id === 'unique') {
            return;
          }

          if (key === 'Backspace' && title === '' && deleteFlag) {
            return taskRequests.remove(id).then((r) => {
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
