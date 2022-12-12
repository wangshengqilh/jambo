import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import storage from "src/store/storage";
import { Alert, ImageBackground } from "react-native";
import { store } from "src/store";
import { Avatar, Pressable, Switch, Text, useToast, View } from "native-base";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { friends, MessageLogging } from "src/assets/static";
import { delete_friend } from "src/store/api";
import { CommonActions } from "@react-navigation/native";

/**
 * 
 * @param props avatar: string, username: string, email: string, phone: string, uid: string
 * @returns 
 */
function FriendInfo(props: IProps) {
  const { avatar, username, email, phone, phonecode, uid } = props.route.params
  const [notice, setNotice] = React.useState<boolean>()
  const dispatch = useAppDispatch();
  const friendList = useAppSelector(selectFriends);
  const toast = useToast()

  React.useEffect(() => {
    for (const item of friendList.data) {
      if (item.id === props.route.params.uid && item.type === 0) {
        setNotice(item.notification)
        break
      }
    }
  }, [])

  const onValueChangeNotice = (value: boolean) => {
    const arr = [...friendList.data]
    for (let i = 0; i < friendList.data.length; i++) {
      if (friendList.data[i].id === props.route.params.uid && friendList.data[i].type === 0) {
        arr[i] = {
          ...friendList.data[i],
          notification: value
        }
        storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
        dispatch(setFriends(arr))
        setNotice(value)
        break
      }
    }
  }

  const onPressDeleteRecord = () => {
    const arr = [...friendList.data]
    for (let i = 0; i < friendList.data.length; i++) {
      if (friendList.data[i].type === 0 && friendList.data[i].id === uid) {
        arr[i] = {
          ...friendList.data[i],
          last_msg: ''
        }
      }
    }
    storage.remove({
      key: MessageLogging + store.getState().myInfo.value.uid,
      id: 0 + props.route.params.uid,
    }).then(() => {
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
      dispatch(setFriends(arr))
      toast.show({ description: 'Chat history cleared' })
    }).catch(() => {
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
      dispatch(setFriends(arr))
      toast.show({ description: 'Chat history cleared' })
    })
  }

  const onPressDeleteFriend = () => {
    Alert.alert(
      "",
      "Deleting friend.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm",
          onPress: () => {
            delete_friend({ friend_id: props.route.params.uid }).then(res => {
              const friends = [...store.getState().friends.value.data]
              for (let i = 0; i < friends.length; i++) {
                if (props.route.params.uid === friends[i].id && friends[i].type === 0) {
                  friends.splice(i, 1)
                  break
                }
              }
              storage.remove({ key: MessageLogging + store.getState().myInfo.value.uid, id: 0 + props.route.params.uid })
              storage.save({ key: friends + store.getState().myInfo.value.uid, data: friends })
              store.dispatch(setFriends(friends))
              toast.show({ description: res.msg })
              if (props.route.params.type === 1) {
                props.navigation.dispatch((state: any) => {
                  const routes = [...state.routes.slice(0, -3)]
                  return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                  });
                })
              } else {
                props.navigation.dispatch((state: any) => {
                  const routes = [...state.routes.slice(0, -2)]
                  return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                  });
                })
              }
            })
          }
        }
      ]
    );
  }

  const protect_email = (user_email: string) => {
    let avg, splitted, part1, part2;
    splitted = user_email.split("@");
    part1 = splitted[0];
    avg = part1.length / 2;
    part1 = part1.substring(0, (part1.length - avg));
    part2 = splitted[1];
    return part1 + "***@" + part2;
  };

  const protect_phone = (phone: string) => {
    const avg = phone.length - 4
    const part1 = phone.substring(0, avg / 2)
    const part2 = phone.substring(part1.length + 4)
    return part1 + "****" + part2;
  };

  return (
    <ImageBackground source={images.background1} style={styles.FriendInfo}>
      <Header title={username} titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <View style={styles.box1}>
          <Avatar source={{ uri: avatar }} size={54}>{username}</Avatar>
          <Text style={[styles.text1, styles.text3]} numberOfLines={1}>{username}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text1}>Email</Text>
          <Text style={styles.text1}>{protect_email(email)}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text1}>Contact Number</Text>
          <Text style={styles.text1}>+{phonecode} {protect_phone(phone)}</Text>
        </View>
        <View style={styles.box1}>
          <Text style={styles.text1}>Notification</Text>
          {
            notice === undefined ?
              null :
              <Switch defaultIsChecked={notice} onValueChange={onValueChangeNotice} />
          }
        </View>
        <Pressable style={styles.box1} onPress={onPressDeleteRecord}>
          <Text style={styles.text2}>Clear Chat History</Text>
        </Pressable>
        <Pressable style={styles.box1} onPress={onPressDeleteFriend}>
          <Text style={styles.text2}>Unfriend</Text>
        </Pressable>
      </ImageBackground>
    </ImageBackground>
  )
}

export default FriendInfo;