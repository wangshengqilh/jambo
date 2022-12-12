import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { skey } from 'src/assets/static';
import { RootState } from '../index';
import { fetchSkey } from './skeyAPI';
import storage from '../storage';

export interface skeyState {
  value: string;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: skeyState = {
  value: '',
  status: 'idle',
};

export const getSkeyAsync = createAsyncThunk(
  'skey/fetchSkey',
  async (skey?: string) => {
    if (skey === undefined) {
      const response = await fetchSkey();
      return response.data;
    } else {
      return skey
    }
  }
);

export const skeySlice = createSlice({
  name: 'skey',
  initialState,
  reducers: {
    setSkey: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    clearSkey: (state) => {
      storage.remove({ key: skey })
      state.value = '';
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getSkeyAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(getSkeyAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    }).addCase(getSkeyAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setSkey, clearSkey } = skeySlice.actions;

export const selectSkey = (state: RootState) => state.skey.value;

export default skeySlice.reducer;