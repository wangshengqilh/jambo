import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Title from "components/Title";
import { ImageBackground } from "react-native";
import { Avatar, Button, Center, Icon, IconButton, Image, ScrollView, Text, View } from "native-base";
import { get_medal } from "src/store/api";
import { TimeDifference } from "src/tool/timeDiffer";
import { store } from "src/store";
import { logOut } from "src/router/customNavigation";

interface IMedal {
  act_id: string
  createdate: number
  id: string
  img1: string
  img2: string
  img3: string
  modifydate: string
  state: string
  uid: string
  title: string
  num: number
}
interface IInfo {
  avatar: string
  country_name: string
  email: string
  username: string
  subjectno: string
  endtime: number
  phone: string
  phonecode: string
}
/**
 * 
 * @param props friend_id
 * @returns 
 */
function UserInfo(props: IProps) {
  const friend_id = props.route.params?.friend_id
  const [type, setType] = React.useState<0 | 1>(0)
  const [medal, setMedal] = React.useState<IMedal[]>([])
  const [userinfo, setUserinfo] = React.useState<IInfo>()
  const [isFriend, setIsFriend] = React.useState<boolean>(false)

  React.useEffect(() => {
    getMedalApi()
    if (friend_id) {
      const friendList = store.getState().friends.value
      for (const item of friendList.data) {
        if (friend_id === item.id && item.type === 0 && item.relationship) {
          setIsFriend(true)
          break
        }
      }
    }
  }, [])

  const getMedalApi = () => {
    get_medal(friend_id).then(res => {
      const medal = Array.isArray(res.data.medal) ? res.data.medal : []
      setMedal(medal)
      setUserinfo(res.data.userinfo)
    })
  }

  const onPressButton = () => {
    if (isFriend) {
      props.navigation.navigate('Chat', { type: 0, id: friend_id, friend_avatar: userinfo?.avatar, group_avatar: [], name: userinfo?.username })
    } else {
      props.navigation.navigate('ApplyAdd', { friend_id })
    }
  }

  const onPressFriendInfo = () => {
    props.navigation.navigate('FriendInfo', { avatar: userinfo?.avatar, username: userinfo?.username, email: userinfo?.email, phone: userinfo?.phone, phonecode: userinfo?.phonecode, uid: friend_id, callback: callbackDeleteFriend })
  }

  const callbackDeleteFriend = () => {
    setIsFriend(false)
  }

  return (
    <ImageBackground source={images.background1} style={styles.UserInfo}>
      <Header
        rightNode={
          friend_id ?
            (
              isFriend ?
                <IconButton onPress={onPressFriendInfo} icon={<Icon as={<FeatherIcon name="more-vertical" />} color='#FFD27B' />} borderRadius="full" /> :
                null
            ) :
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconButton onPress={() => props.navigation.navigate('EditInfo')} icon={<Icon as={<FeatherIcon name="edit" />} color='#FFD27B' />} borderRadius="full" />
              <IconButton onPress={logOut} icon={<Icon as={<FeatherIcon name="log-out" />} color='#FFD27B' />} borderRadius="full" />
            </View>
        }
      />
      <Center style={styles.box1}>
        <Center style={styles.box1_1}>
          <Avatar source={{ uri: userinfo?.avatar }} size={84}>{userinfo?.username}</Avatar>
          <Title style={styles.title1} title={userinfo?.username} numberOfLines={1} />
          <Text numberOfLines={1} style={styles.text1}>{userinfo?.country_name}</Text>
          {
            friend_id && friend_id !== store.getState().myInfo.value.uid.toString() ?
              <Button bgColor='#FFA800' style={styles.button2} onPress={onPressButton}>
                <Title title={isFriend ? 'Send Message' : 'Add Friend'} style={styles.button2Text} />
              </Button> :
              null
          }
        </Center>
      </Center>
      <View style={styles.box}>
        <View style={styles.box2}>
          <Button onPress={() => setType(0)} _text={{ color: '#4B4B4B' }} bgColor={type === 0 ? '#FFA800' : '#FFD27B'} style={styles.button1}>Badges</Button>
          <Button onPress={() => setType(1)} _text={{ color: '#4B4B4B' }} bgColor={type === 1 ? '#FFA800' : '#FFD27B'} style={styles.button1}>Activities</Button>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {
            type === 0 ?
              <View style={styles.box3}>
                {
                  medal.map(item =>
                    <View style={styles.box3_item} key={item.id}>
                      <Image source={{ uri: item.img2 }} style={styles.img1} />
                      <Text numberOfLines={2} style={styles.text2}>{item.title}</Text>
                      <Text style={styles.text4} fontWeight='bold'>x{item.num}</Text>
                    </View>
                  )
                }
              </View> :
              <View style={styles.box4}>
                {
                  userinfo?.endtime ?
                    <View style={styles.box4_item}>
                      <Image source={images.Icon1} style={styles.img2} />
                      <View >
                        <Title title={`Completed lesson ${userinfo?.subjectno} of JamboAcademy`} style={styles.title2} />
                        <Text style={styles.text3}>{TimeDifference(userinfo?.endtime)}</Text>
                      </View>
                    </View> :
                    null
                }
                {
                  medal.map(item =>
                    <View style={styles.box4_item} key={item.id}>
                      <Image source={images.Icon1} style={styles.img2} />
                      <View >
                        <Title title='Congratualtions! You’ve recieved the ' style={styles.title2} />
                        <Title title={`(${item.title}) Badge`} style={styles.title3} />
                        <Text style={styles.text3}>{TimeDifference(item.createdate)}</Text>
                      </View>
                    </View>
                  )
                }
              </View>
          }
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

export default UserInfo;