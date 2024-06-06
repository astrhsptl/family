import { taskRequests } from '@/features/requests';
import { EntityId, Task } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { RootState } from '../types';

type taskArray = Task[];
const initialStatement: taskArray = [];

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialStatement,
  reducers: {
    refetch(state) {
      taskRequests.fetchAll().then((res) => {
        if (res) {
          state = res.data.data;
        }
      });
    },
    loads(state, payload: PayloadAction<taskArray>) {
      state = payload.payload;
    },
    append(state, payload: PayloadAction<Task>) {
      state = [...state, payload.payload];
    },
    remove(state, payload: PayloadAction<EntityId | 'last'>) {
      if (payload.payload === 'last') {
        state.pop();
        return;
      }

      state = state.filter((task) => task.id === payload.payload);
      taskRequests
        .remove(payload.payload)
        .then(() => toast.success('Successful delete task'));

      return;
    },
  },
});

export const { loads } = taskSlice.actions;
export const taskReducer = taskSlice.reducer;
export const currentTask = (state: RootState) => state.task;
