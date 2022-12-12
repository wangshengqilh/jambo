import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface celebrateState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: celebrateState = {
  value: 0,
  status: 'idle',
};

export const celebrateSlice = createSlice({
  name: 'celebrate',
  initialState,
  reducers: {
    setCelebrate: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    }
  },
});

export const { setCelebrate } = celebrateSlice.actions;

export const selectCelebrate = (state: RootState) => state.celebrate.value;

export default celebrateSlice.reducer;