import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'react-native-gifted-chat';
import { RootState } from '../index';

export interface openState {
  value: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: openState = {
  value: true,
  status: 'idle',
};

export const openSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload
    }
  },
});

export const { setOpen } = openSlice.actions;

export const selectOpen = (state: RootState) => state.open.value;

export default openSlice.reducer;