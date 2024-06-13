import { User } from '@/entities';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../types';

export interface IUserState {
  user: User | null;
}

const user: IUserState = { user: null };

export const userSlice = createSlice({
  name: 'user',
  initialState: user,
  reducers: {
    setUser(state, { payload }: PayloadAction<User>) {
      state.user = payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const currentUser = (state: RootState) => state.user;
