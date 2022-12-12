import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { myInfo } from 'src/assets/static';
import { RootState } from '../index';
import { fetchMyInfo } from './myInfoAPI';
import storage from '../storage';

export interface IUserInfo {
  username: string
  birthday: number
  email: string
  phoneCode: string
  phone: string
  country_name: string
  country_id: string
  password: string
  avatar: string
  idcard: string
  accesscount: 0 | 1 | 2
  uid: string
  idcard_state: '0' | '1' | '2' | '3' // 未上身份证  通过   未通过   身份证审核中
  is_ambassador: number
}

export interface myInfoState {
  value: IUserInfo;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: myInfoState = {
  value: {
    username: '',
    birthday: 0,
    email: '',
    phoneCode: '',
    phone: '',
    country_name: '',
    country_id: '',
    password: '',
    avatar: '',
    idcard: '',
    accesscount: 0,
    uid: '',
    idcard_state: '0',
    is_ambassador: 0
  },
  status: 'idle',
};

export const getMyInfoAsync = createAsyncThunk(
  'myInfo/fetchMyInfo',
  async () => {
    const response = await fetchMyInfo();
    return response.data;
  }
);

export const myInfoSlice = createSlice({
  name: 'myInfo',
  initialState,
  reducers: {
    setMyInfo: (state, action: PayloadAction<IUserInfo>) => {
      state.value = action.payload;
      storage.save({ key: myInfo, data: action.payload })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getMyInfoAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(getMyInfoAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = action.payload;
    }).addCase(getMyInfoAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setMyInfo } = myInfoSlice.actions;

export const selectMyInfo = (state: RootState) => state.myInfo.value;

export default myInfoSlice.reducer;