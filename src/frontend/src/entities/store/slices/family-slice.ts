import { Family } from '@/entities';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface IFamilyState {
  family: Family | null;
}

const family: IFamilyState = { family: null };

export const familySlice = createSlice({
  name: 'family',
  initialState: family,
  reducers: {
    setFamily(state, { payload }: PayloadAction<Family>) {
      state.family = payload;
    },
  },
});

export const { setFamily } = familySlice.actions;
export const familyReducer = familySlice.reducer;
export const currentFamily = (state: RootState) => state.family;
