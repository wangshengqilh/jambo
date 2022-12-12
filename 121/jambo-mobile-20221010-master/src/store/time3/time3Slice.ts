import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface time3State {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: time3State = {
  value: 0,
  status: 'idle',
};

export const time3Slice = createSlice({
  name: 'time3',
  initialState,
  reducers: {
    setTime3: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setTime3 } = time3Slice.actions;

export const selectTime3 = (state: RootState) => state.time3.value;

export default time3Slice.reducer;