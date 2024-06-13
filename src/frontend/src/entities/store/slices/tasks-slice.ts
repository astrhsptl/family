import { Task, TaskCreate, TaskUpdate } from '@/entities';
import { taskRequests } from '@/features/requests';
import { createAppAsyncThunk, EntityId } from '@/shared';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../types';

interface CustomPayload<T> {
  id: EntityId;
  data: T;
}

interface InitialState {
  tasks: Task[];
}

const initialStatement: InitialState = { tasks: [] };

export const changeStatus = createAppAsyncThunk(
  'task/changeStatus',
  async (id: EntityId, { getState }) => {
    const tasks = getState().task.tasks;
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      return null;
    }

    const { data } = await taskRequests.update(id, {
      is_finished: !task.is_finished,
    });
    return tasks.map((task) =>
      task.id === id ? { ...task, is_finished: data.is_finished } : task
    );
  }
);

export const removeTask = createAppAsyncThunk(
  'task/removeTask',
  async (id: EntityId, { getState }) => {
    const tasks = getState().task.tasks;
    taskRequests.remove(id);
    return tasks.filter((task) => task.id !== id);
  }
);

export const createTask = createAppAsyncThunk(
  'task/createTask',
  async (data: TaskCreate) => {
    const { data: task } = await taskRequests.create(data);
    return task;
  }
);

export const taskSlice = createSlice({
  name: 'task',
  initialState: initialStatement,
  reducers: {
    refetch(state) {
      taskRequests.fetchAll().then((res) => {
        if (res) {
          state.tasks = res.data.data;
        }
      });
    },

    loads(state, { payload }: PayloadAction<Task[]>) {
      state.tasks = [...payload];
    },

    update(state, payload: PayloadAction<CustomPayload<TaskUpdate>>) {
      const { id, data } = payload.payload;
      const task = state.tasks.find((task) => task.id === id);

      if (!task) {
        return;
      }

      taskRequests.update(task.id, data);
    },
  },

  extraReducers: (builder) => {
    builder.addCase(changeStatus.fulfilled, (state, { payload }) => {
      if (payload) {
        state.tasks = payload;
      }
    });
    builder.addCase(removeTask.fulfilled, (state, { payload }) => {
      if (payload) {
        state.tasks = payload;
      }
    });
    builder.addCase(createTask.fulfilled, (state, { payload }) => {
      if (payload) {
        state.tasks.push(payload);
      }
    });
  },
});

export const taskActions = taskSlice.actions;
export const tasksReducer = taskSlice.reducer;
export const currentTasks = (state: RootState) => state.task;
