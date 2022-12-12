import storage from '../storage';
import { apply } from 'src/assets/static';
import { IApply } from './applySlice';
import { store } from '..';

export function fetchApply() {
  return new Promise<{ data: IApply[] }>((resolve) => {
    storage.load({ key: apply + store.getState().myInfo.value.uid }).then(ret => {
      resolve({ data: ret })
    })
  })
}