//RootNavigation.js
import * as React from 'react';
import { CommonActions } from '@react-navigation/native';
import { Urls } from './type';
import { store } from 'src/store';
import { clearSkey } from 'src/store/skey/skeySlice';
import { stopGettingNewMessages } from 'src/tool/IM';
// import { user_usetime } from 'src/store/api';

export const customNavigation: any = React.createRef();

// navigate
export function navigate(name: Urls, params?: any) {
  customNavigation.current?.navigate(name, params);
}
// goBack
export function goBack() {
  customNavigation.current?.goBack();
}
// 返回登录页
export function logOut() {
  // user_usetime()
  stopGettingNewMessages()
  store.dispatch(clearSkey())
  customNavigation.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [
        { name: 'Login' }
      ],
    })
  );
}
