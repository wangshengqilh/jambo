import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, store } from '../index';
import { fetchApply } from './applyAPI';
import { apply } from 'src/assets/static';
import storage from '../storage';

export interface IApply {
  avatar: string
  username: string
  country_name: string
  state: 0 | 1 | 2 // 添加  已同意   已拒绝
  uid: string
  content: string
}

export interface applyState {
  value: {
    data: IApply[]
    length: number
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: applyState = {
  value: {
    data: [],
    length: -1
  },
  status: 'idle',
};

export const getApplyAsync = createAsyncThunk(
  'apply/fetchApply',
  async () => {
    const response = await fetchApply();
    return response.data;
  }
);

export const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {
    setApply: (state, action: PayloadAction<IApply[]>) => {
      state.value = {
        data: action.payload,
        length: action.payload.length
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getApplyAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(getApplyAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = {
        data: action.payload,
        length: action.payload.length
      }
    }).addCase(getApplyAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setApply } = applySlice.actions;

export const selectApply = (state: RootState) => state.apply.value;

export default applySlice.reducer;