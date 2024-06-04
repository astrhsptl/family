import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';

const isActive: boolean | null = false;

export const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: isActive,
  reducers: {
    toggle(state) {
      state = !state;
      return state;
    },

    open(state) {
      state = true;
      return state;
    },

    close(state) {
      state = false;
      return state;
    },
  },
});

export const { toggle, open, close } = modalStateSlice.actions;
export const modalStateReducer = modalStateSlice.reducer;
export const currentModalState = (state: RootState) => state.modalState;
