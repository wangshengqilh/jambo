import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import skeyReducer from './skey/skeySlice';
import toastReducer from './toast/toastSlice';
import myInfoReducer from './myInfo/myInfoSlice';
import maskReducer from './mask/maskSlice';
import friendsReducer from './friends/friendsSlice';
import applyReducer from './apply/applySlice';
import newMsgReducer from './newMsg/newMsgSlice';
import openReducer from './open/openSlice';
import celebrateReducer from './celebrate/celebrateSlice';
import time3Reducer from './time3/time3Slice'
import time2Reducer from './time2/time2Slice'
import adReducer from './ad/adSlice'

export const store = configureStore({
  reducer: {
    skey: skeyReducer,
    toast: toastReducer,
    myInfo: myInfoReducer,
    mask: maskReducer,
    friends: friendsReducer,
    apply: applyReducer,
    newMsg: newMsgReducer,
    open: openReducer,
    celebrate: celebrateReducer,
    time3: time3Reducer,
    time2: time2Reducer,
    ad: adReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
