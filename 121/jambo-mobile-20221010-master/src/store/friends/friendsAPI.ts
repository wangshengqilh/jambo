import { friends } from 'src/assets/static';
import { IFriend } from './friendsSlice';
import storage from '../storage';
import { my_friends_list, my_group_list } from '../api';
import { store } from '..';

export function fetchFriends() {
  return new Promise<{ data: IFriend[] }>((resolve) => {
    storage.load({ key: friends + store.getState().myInfo.value.uid }).then(ret => {
      resolve({ data: ret })
    }).catch(() => {
      my_friends_list().then(res1 => {
        const arr0 = Array.isArray(res1.data.result) ? res1.data.result : []
        const arr2: IFriend[] = []
        for (const item of arr0) {
          arr2.push({
            country_name: item.country_name,
            friend_avatar: item.friend_avatar,
            id: item.friend_id,
            name: item.friend_name,
            notification: true,
            group_avatar: [],
            last_msg: '',
            last_msg_type: 0,
            type: 0,
            unread: 0,
            relationship: true,
          })
        }
        my_group_list().then(res2 => {
          const arr1 = Array.isArray(res2.data) ? res2.data : []
          for (const item of arr1) {
            arr2.push({
              country_name: '',
              friend_avatar: '',
              id: item.id,
              name: item.title,
              notification: true,
              group_avatar: item.avatar,
              last_msg: '',
              last_msg_type: 0,
              type: 1,
              unread: 0,
              relationship: true,
            })
          }
          storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr2 })
          resolve({ data: arr2 })
        })
      })
    })
  });
}
