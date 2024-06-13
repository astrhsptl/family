'use client';

import { AppDispatch, RootState } from '@/entities';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

type RejectValue = {
  detail: string;
};

type ThunkApiConfig = {
  state: RootState;
  dispatch: AppDispatch;
  rejectValue: RejectValue;
  extra: unknown;
};

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const createAppAsyncThunk = createAsyncThunk.withTypes<ThunkApiConfig>();
