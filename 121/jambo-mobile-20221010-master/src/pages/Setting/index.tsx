import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import storage from "src/store/storage";
import { ImageBackground, Alert } from "react-native";
import { Divider, Pressable, Text, useToast } from "native-base";
import { logOut } from "src/router/customNavigation";
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setApply } from "src/store/apply/applySlice";
import { selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { send_email_code } from "src/store/api";
import { selectMyInfo } from "src/store/myInfo/myInfoSlice";
import { store } from "src/store";
import { friends } from "src/assets/static";

function Setting(props: IProps) {
  const dispatch = useAppDispatch();
  const toast = useToast()
  const friendList = useAppSelector(selectFriends);
  const myinfo = useAppSelector(selectMyInfo)

  const onPressLogout = () => {
    logOut()
  }

  const onPressPolicyAgreement = (title: string) => {
    props.navigation.navigate('PolicyAgreement', { title })
  }

  const onPressClear = () => {
    Alert.alert(
      "Warning",
      "Clearing cache will delete your chat record, unsubmitted quizzes and unanswered friend requests, which cannot be restored.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete", onPress: () => {
            const arr = [...friendList.data]
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].relationship) {
                arr[i] = {
                  ...arr[i],
                  last_msg: '',
                  unread: 0
                }
              } else {
                arr.splice(i, 1)
                i--
              }
            }
            storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
            dispatch(setFriends(arr))
            storage.clearMap()
            dispatch(setApply([]))
            toast.show({ description: 'Deleted' })
          }
        }
      ]
    )
  }

  const onPressPassword = () => {
    send_email_code({ email: myinfo.email, type: 'reset_passwd' }).then(res => {
      props.navigation.navigate('Verification', { data: { email: myinfo.email }, type: 3 })
    })
  }

  const onPressFeedback = () => {
    props.navigation.navigate('Feedback')
  }

  return (
    <ImageBackground source={images.background1} style={styles.Setting}>
      <Header title="Settings" titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <Pressable style={styles.itembutton1} onPress={() => onPressPolicyAgreement('Terms of Use')}>
          <Text style={styles.text1}>Terms of Use</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
        <Pressable style={styles.itembutton1} onPress={() => onPressPolicyAgreement('Privacy Policy')}>
          <Text style={styles.text1}>Privacy Policy</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
        <Pressable style={styles.itembutton1} onPress={onPressClear}>
          <Text style={styles.text1}>Clear Cache</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
        <Pressable style={styles.itembutton1} onPress={onPressFeedback}>
          <Text style={styles.text1}>Feedback</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
        <Pressable style={styles.itembutton1} onPress={onPressPassword}>
          <Text style={styles.text1}>Change Password</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
        <Pressable style={styles.itembutton1} onPress={onPressLogout}>
          <Text style={styles.text1}>Logout</Text>
          <FeatherIcon name="chevron-right" size={16} />
        </Pressable>
        <Divider />
      </ImageBackground>
    </ImageBackground>
  )
}

export default Setting;