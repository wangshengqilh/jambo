import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface toastState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: toastState = {
  value: '',
  status: 'idle',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setToast } = toastSlice.actions;

export const selectToast = (state: RootState) => state.toast.value;

export default toastSlice.reducer;