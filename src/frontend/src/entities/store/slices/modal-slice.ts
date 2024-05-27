import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';

const initialState: boolean = false;

export const modalStateSlice = createSlice({
  name: 'modalState',
  initialState: initialState,
  reducers: {
    toggle(state, action: PayloadAction<unknown>) {
      state = !state;
    },
  },
});

export const { toggle } = modalStateSlice.actions;
export const modalStateReducer = modalStateSlice.reducer;
export const currentModalState = (state: RootState) => state.modalState;
