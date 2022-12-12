import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { fetchFriends } from './friendsAPI';

export interface IFriend {
  country_name: string
  friend_avatar: string
  id: string
  name: string
  notification: boolean
  group_avatar: string[]
  last_msg: string
  last_msg_type: number //         // 0 | 1 | 99  0文本 1图片  99系统通知
  type: 0 | 1                   // 0单聊 1群聊
  unread: number                // 未读消息数量
  relationship: boolean         // 与好友、群组的关系，true代表是好友或者在群组中状态， false则相反
}

export interface friendsState {
  value: {
    data: IFriend[]
    length: number
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: friendsState = {
  value: {
    data: [],
    length: -1
  },
  status: 'idle',
};

export const getFriendsAsync = createAsyncThunk(
  'friends/fetchFriends',
  async () => {
    const response = await fetchFriends();
    return response.data;
  }
);

export const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setFriends: (state, action: PayloadAction<IFriend[]>) => {
      state.value = {
        data: action.payload,
        length: action.payload.length
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getFriendsAsync.pending, (state) => {
      state.status = 'loading';
    }).addCase(getFriendsAsync.fulfilled, (state, action) => {
      state.status = 'idle';
      state.value = {
        data: action.payload,
        length: action.payload.length
      };
    }).addCase(getFriendsAsync.rejected, (state) => {
      state.status = 'failed';
    });
  },
});

export const { setFriends } = friendsSlice.actions;

export const selectFriends = (state: RootState) => state.friends.value;

export default friendsSlice.reducer;