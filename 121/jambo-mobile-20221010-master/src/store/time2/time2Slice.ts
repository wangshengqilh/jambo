import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

interface time2State {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: time2State = {
  value: 0,
  status: 'idle',
};

export const time2Slice = createSlice({
  name: 'time2',
  initialState,
  reducers: {
    setTime2: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { setTime2 } = time2Slice.actions;

export const selectTime2 = (state: RootState) => state.time2.value;

export default time2Slice.reducer;