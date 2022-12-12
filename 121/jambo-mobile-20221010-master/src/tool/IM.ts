
import Sound from "react-native-sound"
import BackgroundTimer from 'react-native-background-timer'
import storage from "src/store/storage";
import deviceInformation from "./deviceInformation";
import PushNotification, { Importance } from 'react-native-push-notification';
import { Vibration } from "react-native"
import { msg_list } from "src/store/api";
import { getFriendsAsync, setFriends } from "src/store/friends/friendsSlice";
import { getApplyAsync, IApply, setApply } from "src/store/apply/applySlice";
import { store } from "src/store";
import { apply, channelId, MessageLogging } from "src/assets/static";
import { setNewMsg } from "src/store/newMsg/newMsgSlice";

interface IMsgApi {
  f_uid: string
  group_id: string
  friend_avatar: string
  avatar: string[]
  friend_name: string
  group_title: string
  last_msg: string
  last_msg_id: string
  last_msg_type: '1' | '2' | '3' | '4'      // 1图片 2文本 3视频 4语音
  last_time: string
  last_user: string
  msg_type: '0' | '1' | '2' | '3' | '4'     // 0群组中的新消息 1好友发送的新消息消息 2有人添加我为好友消息 3对方同意我添加他为好友消息 4解散群
  unread_num: string
  country_name: string
  content: string
}

const musciPath = require('src/assets/9450.mp3');
const music = new Sound(musciPath)

const playNotice = () => {
  Vibration.vibrate()
  music.play()
}

const localNotification = (title: string, message: string, when: number) => {
  const open = store.getState().open.value
  if (!open) {
    PushNotification.localNotification({
      channelId,
      title,
      message,
      when
    })
  }
}

const getMsgList = () => {
  const friends = [...store.getState().friends.value.data]
  const applys = store.getState().apply.value.data
  msg_list().then(res => {
    let num = 0
    const arr: IMsgApi[] = Array.isArray(res.data) ? res.data : []
    for (const item of arr) {
      if (item.msg_type === '2') {
        // 有人添加我为好友消息
        playNotice()
        const arr1: IApply[] = [{
          avatar: item.friend_avatar,
          username: item.friend_name,
          country_name: item.country_name,
          state: 0,
          uid: item.f_uid,
          content: item.content
        }, ...applys]
        for (let i = 0; i < arr1.length; i++) {
          for (let j = i + 1; j < arr1.length; j++) {
            if (arr1[i].uid.toString() === arr1[j].uid.toString()) {
              arr1.splice(j, 1);
              j--;
            }
          }
        }
        storage.save({ key: apply + store.getState().myInfo.value.uid, data: arr1 })
        store.dispatch(setApply(arr1))
        localNotification('Apply', `${item.friend_name} asked to add you as his friend.`, Number(item.last_time))
      } else if (item.msg_type === '3') {
        // 对方同意我添加他为好友消息
        friends.unshift({
          country_name: item.country_name,
          friend_avatar: item.friend_avatar,
          id: item.f_uid,
          name: item.friend_name,
          notification: true,
          group_avatar: [],
          last_msg: `${item.friend_name} has accepted your friend request. Now let’s chat!`,
          last_msg_type: 99,                                  // 0 | 1 | 99  0文本 1图片  99系统通知
          type: 0,                                            // 0单聊 1群聊
          unread: 0,                                           // 未读消息数量
          relationship: true
        })
        storage.load({
          key: MessageLogging + store.getState().myInfo.value.uid,
          id: 0 + item.f_uid,
        }).then(ret => {
          if (ret.length) {
            storage.save({
              key: MessageLogging + store.getState().myInfo.value.uid,
              id: 0 + item.f_uid,
              data: [...ret, {
                _id: item.f_uid + new Date().getTime(),
                createdAt: new Date(),
                text: `${item.friend_name} has accepted your friend request. Now let’s chat!`,
                system: true,
                user: {
                  _id: item.f_uid,
                  avatar: item.friend_avatar,
                  name: item.friend_name
                }
              }]
            })
          }
        }).catch(() => {
          storage.save({
            key: MessageLogging + store.getState().myInfo.value.uid,
            id: 0 + item.f_uid,
            data: [{
              _id: item.f_uid + new Date().getTime(),
              createdAt: new Date(),
              text: `${item.friend_name} has accepted your friend request. Now let’s chat!`,
              system: true,
              user: {
                _id: item.f_uid,
                avatar: item.friend_avatar,
                name: item.friend_name
              }
            }]
          })
        })
        playNotice()
        num++
      } else if (item.msg_type === '4') {
        // 解散群
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].type === 1 && friends[i].id === item.group_id) {
            friends[i] = {
              ...friends[i],
              last_msg: 'Dissolution.',
              last_msg_type: 99,                                  // 0 | 1 | 99  0文本 1图片  99系统通知
              relationship: false
            }
            break
          }
        }
        store.dispatch(setNewMsg({ type: 1, id: item.group_id }))
        num++
      } else if (item.msg_type === '1') {
        // 好友发送的新消息消息
        for (const ite of friends) {
          if (ite.type === 0 && ite.id === item.f_uid) {
            if (ite.notification) {
              playNotice()
              localNotification(item.friend_name, item.last_msg_type === '1' ? 'Image' : (item.last_msg_type === '3' ? 'Video' : item.last_msg), Number(item.last_time))
            }
            friends.unshift({
              ...ite,
              last_msg: item.last_msg,
              last_msg_type: Number(item.last_msg_type),
              unread: Number(item.unread_num || 0)
            })
            break
          }
        }
        store.dispatch(setNewMsg({ type: 0, id: item.f_uid }))
        num++
      } else if (item.msg_type === '0') {
        // 群组中的新消息
        let b = true
        for (const ite of friends) {
          if (ite.type === 1 && ite.id === item.group_id) {
            if (ite.notification) {
              playNotice()
              localNotification(item.group_title, item.last_msg_type === '1' ? 'Image' : (item.last_msg_type === '3' ? 'Video' : item.last_msg), Number(item.last_time))
            }
            friends.unshift({
              ...ite,
              last_msg: item.last_msg,
              last_msg_type: Number(item.last_msg_type),
              unread: Number(item.unread_num || 0)
            })
            b = false
            break
          }
        }
        if (b) {
          playNotice()
          localNotification(item.group_title, item.last_msg_type === '1' ? 'Image' : (item.last_msg_type === '3' ? 'Video' : item.last_msg), Number(item.last_time))
          friends.unshift({
            last_msg: item.last_msg,
            last_msg_type: Number(item.last_msg_type),
            unread: Number(item.unread_num || 0),
            country_name: '',
            friend_avatar: '',
            id: item.group_id,
            name: item.group_title,
            notification: true,
            group_avatar: item.avatar,
            type: 1,
            relationship: true
          })
        }
        store.dispatch(setNewMsg({ type: 1, id: item.group_id }))
        num++
      }
    }
    if (num) {
      for (let i = 0; i < friends.length; i++) {
        for (let j = i + 1; j < friends.length; j++) {
          if (friends[i].id.toString() === friends[j].id.toString() && friends[i].type === friends[j].type) {
            friends.splice(j, 1);
            j--;
          }
        }
      }
      store.dispatch(setFriends(friends))
    }
  })
}

export const startGettimgNewMessage = () => {
  store.dispatch(getFriendsAsync())
  store.dispatch(getApplyAsync())
  PushNotification.createChannel(
    {
      channelId,
      channelName: "Jambo channel",
      channelDescription: "A channel to categorise your notifications",
      playSound: false,
      soundName: "default",
      importance: Importance.HIGH,
      vibrate: true,
    },
    (created) => { }
  )
  deviceInformation()
  BackgroundTimer.runBackgroundTimer(() => {
    getMsgList()
  }, 5000);
}

export const stopGettingNewMessages = () => {
  BackgroundTimer.stopBackgroundTimer()
}
