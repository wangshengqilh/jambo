import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FlatListVertical from "components/FlatListVertical";
import Title from "components/Title";
import storage from "src/store/storage";
import { ImageBackground } from "react-native";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { IApply, selectApply, setApply } from "src/store/apply/applySlice";
import { Avatar, Button, Pressable, Text, View } from "native-base";
import { agree_friend } from "src/store/api";
import { apply, friends, MessageLogging } from "src/assets/static";
import { store } from "src/store";
import { IFriend, selectFriends, setFriends } from "src/store/friends/friendsSlice";

// 新朋友申请
function Apply(props: IProps) {
  const dispatch = useAppDispatch();
  const friendList = useAppSelector(selectFriends)
  const applyData = useAppSelector(selectApply);
  const [openIndex, setOpenIndex] = React.useState<number | undefined>(undefined)

  const childrenComponent = (item: IApply, index: number) => {
    return (
      <View style={styles.itemchildren}>
        <View style={styles.msgItemLeft}>
          <Pressable onPress={() => props.navigation.navigate('UserInfo', { friend_id: item.uid })}>
            <Avatar source={{ uri: item.avatar }} size={50}>
              {item.username}
            </Avatar>
          </Pressable>
          <View style={styles.nameView}>
            <Title style={styles.nameText} title={item.username} numberOfLines={1} />
            <Text onPress={() => {
              setOpenIndex(i => i === undefined ? index : undefined)
            }} numberOfLines={openIndex === index ? undefined : 1} style={{ fontSize: 12, color: '#999' }}>{item.content}</Text>
          </View>
        </View>

        {
          item.state === 0 ?
            <Button.Group size="sm">
              <Button onPress={() => onPressAcce(item)}>Accept</Button>
              <Button variant='outline' onPress={() => onPressDecline(item.uid)}>Decline</Button>
            </Button.Group> :
            item.state === 1 ?
              <Text style={styles.text1}>Agreed</Text> :
              <Text style={styles.text2}>Rejected</Text>
        }
      </View>
    )
  }

  const onPressAcce = (item: IApply) => {
    agree_friend({ friend_id: item.uid }).then(res => {
      const arr: IApply[] = [...applyData.data]
      for (let i = 0; i < applyData.data.length; i++) {
        if (applyData.data[i].uid === item.uid) {
          arr[i] = {
            ...applyData.data[i],
            state: 1
          }
          break
        }
      }
      storage.save({ key: apply + store.getState().myInfo.value.uid, data: arr })
      dispatch(setApply(arr))
      const arr1: IFriend[] = [...friendList.data]
      let b = true
      for (let i = 0; i < friendList.data.length; i++) {
        if (item.uid === friendList.data[i].id && friendList.data[i].type === 0) {
          arr1[i] = {
            ...friendList.data[i],
            friend_avatar: item.avatar,
            name: item.username,
            notification: true,
            last_msg: `You have accepted ${item.username}'s friend request.`,
            last_msg_type: 99,
            unread: 0,
            relationship: true
          }
          b = false
          break
        }
      }
      if (b) {
        arr1.unshift({
          country_name: item.country_name,
          friend_avatar: item.avatar,
          id: item.uid,
          name: item.username,
          notification: true,
          group_avatar: [],
          last_msg: `You have accepted ${item.username}'s friend request.`,
          last_msg_type: 99,
          type: 0,
          unread: 0,
          relationship: true
        })
      }
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr1 })
      dispatch(setFriends(arr1))
      storage.load({
        key: MessageLogging + store.getState().myInfo.value.uid,
        id: 0 + item.uid,
      }).then(ret => {
        storage.save({
          key: MessageLogging + store.getState().myInfo.value.uid,
          id: 0 + item.uid,
          data: [...ret, {
            _id: new Date().getTime().toString(),
            createdAt: new Date(),
            text: `You have accepted ${item.username}'s friend request.`,
            image: '',
            system: true,
            user: {
              _id: item.uid,
              avatar: item.avatar,
              name: item.username
            },
          }]
        })
      }).catch(() => {
        storage.save({
          key: MessageLogging + store.getState().myInfo.value.uid,
          id: 0 + item.uid,
          data: [{
            _id: item.uid,
            createdAt: new Date(),
            text: `You have accepted ${item.username}'s friend request.`,
            image: '',
            system: true,
            user: {
              _id: item.uid,
              avatar: item.avatar,
              name: item.username
            },
          }]
        })
      })
    })
  }

  const onPressDecline = (uid: string) => {
    const arr: IApply[] = [...applyData.data]
    for (let i = 0; i < applyData.data.length; i++) {
      if (applyData.data[i].uid === uid) {
        arr[i] = {
          ...applyData.data[i],
          state: 2
        }
        break
      }
    }
    dispatch(setApply(arr))
  }

  return (
    <ImageBackground source={images.background1} style={styles.Apply}>
      <Header title='New Friends' titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <FlatListVertical
          data={applyData.data}
          childrenComponent={childrenComponent}
          spacing={0}
        />
      </ImageBackground>
    </ImageBackground>
  )
}

export default Apply;