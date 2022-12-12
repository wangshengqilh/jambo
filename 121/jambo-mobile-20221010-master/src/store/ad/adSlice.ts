import {  createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';

export interface adState {
  value: boolean;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: adState = {
  value: false,
  status: 'idle',
};

export const adSlice = createSlice({
  name: 'ad',
  initialState,
  reducers: {
    setAd: (state, action: PayloadAction<boolean>) => {
      state.value = action.payload;
    }
  },
});

export const { setAd } = adSlice.actions;

export const selectAd = (state: RootState) => state.ad.value;

export default adSlice.reducer;