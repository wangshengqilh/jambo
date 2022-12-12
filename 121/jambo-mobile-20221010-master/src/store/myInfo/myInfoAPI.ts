import { myInfo } from 'src/assets/static';
import { IUserInfo } from './myInfoSlice';
import storage from '../storage';

export function fetchMyInfo() {
  return new Promise<{ data: IUserInfo }>((resolve) => {
    storage.load({ key: myInfo }).then(ret => {
      resolve({ data: ret })
    })
  });
}
