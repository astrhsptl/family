import { Task } from '@/entities';
import { taskRequests } from '@/features/requests';
import { Dispatch, SetStateAction } from 'react';
import toast from 'react-hot-toast';

export const changeTaskStatus = async (
  task: Task,
  status: boolean,
  setStatus: Dispatch<SetStateAction<boolean>>
) => {
  taskRequests.update(task.id, { is_finished: !status }).then(({ data }) => {
    setStatus(data.is_finished);
    toast.success(data.is_finished ? 'Closed' : 'Opened');
  });
};
