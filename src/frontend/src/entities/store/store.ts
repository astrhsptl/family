import { configureStore } from '@reduxjs/toolkit';
import { modalStateReducer } from './slices';

export const store = configureStore({
  reducer: {
    modalState: modalStateReducer,
  },
});
