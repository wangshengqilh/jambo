import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface maskState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: maskState = {
  value: '',
  status: 'idle',
};

export const maskSlice = createSlice({
  name: 'mask',
  initialState,
  reducers: {
    onMask: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
});

export const { onMask } = maskSlice.actions;

export const selectMask = (state: RootState) => state.mask.value;

export default maskSlice.reducer;