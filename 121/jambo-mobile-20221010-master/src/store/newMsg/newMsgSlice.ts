import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage } from 'react-native-gifted-chat';
import { RootState } from '../index';

export type TMessage = IMessage & { s?: 0 | 1 | 2 }

export interface INewMsg {
  id: string
  type: 0 | 1
}

export interface newMsgState {
  value: INewMsg;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: newMsgState = {
  value: {
    id: '',
    type: 0
  },
  status: 'idle',
};

export const newMsgSlice = createSlice({
  name: 'newMsg',
  initialState,
  reducers: {
    setNewMsg: (state, action: PayloadAction<INewMsg>) => {
      state.value = action.payload
    }
  },
});

export const { setNewMsg } = newMsgSlice.actions;

export const selectNewMsg = (state: RootState) => state.newMsg.value;

export default newMsgSlice.reducer;