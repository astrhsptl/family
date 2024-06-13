import { configureStore } from '@reduxjs/toolkit';
import {
  familyReducer,
  modalStateReducer,
  tasksReducer,
  userReducer,
} from './slices';

export const store = configureStore({
  reducer: {
    modalState: modalStateReducer,
    user: userReducer,
    family: familyReducer,
    task: tasksReducer,
  },
});
