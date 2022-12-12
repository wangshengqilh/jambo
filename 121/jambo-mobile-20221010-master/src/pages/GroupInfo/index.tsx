import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Title from "components/Title";
import storage from "src/store/storage";
import { Alert, Animated, Dimensions, ImageBackground, ScrollView } from "react-native";
import { exit_group, group_detail, group_dissolution, group_kick_out, group_members_list, group_update } from "src/store/api";
import { Avatar, Button, Divider, FormControl, Icon, IconButton, Image, Input, Modal, Pressable, Switch, Text, TextArea, useToast, View } from "native-base";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectMyInfo } from "src/store/myInfo/myInfoSlice";
import { IFriend, selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { friends, MessageLogging } from "src/assets/static";
import { store } from "src/store";
import { CommonActions } from "@react-navigation/native";

const { width } = Dimensions.get('screen')
export interface IMember {
  avatar: string
  createdate: string
  group_id: string
  id: string
  last_msg_id: string
  last_notification_id: string
  outdate: string
  state: string
  uid: string
  unread_num: string
  username: string
}
interface IGroup {
  administrators: string
  content: string
  createdate: string
  id: string
  modifydate: string
  num: string
  state: string
  title: string
  uid: string
  avatar: string[]
}
const startH = (width - 108) / 5 + 52
// 群组信息
/**
 * @params group_id: string
 */
function GroupInfo(props: IProps) {
  const toast = useToast()
  const dispatch = useAppDispatch();
  const myInfo = useAppSelector(selectMyInfo);
  const group_id = props.route.params.group_id
  const hAnim = React.useRef(new Animated.Value(startH)).current;
  const [members, setMembers] = React.useState<IMember[]>([])
  const [groupInfo, setGroupInfo] = React.useState<IGroup>()
  const [isKicking, setIsKicking] = React.useState<boolean>(false)
  const [openMem, setOpenMem] = React.useState<boolean>(false)
  const [title, setTitle] = React.useState<string | null>(null)
  const [content, setContent] = React.useState<string | null>(null)
  const [notification, setNotification] = React.useState<boolean>()
  const friendList = useAppSelector(selectFriends);
  const [group_avatar, set_group_avatar] = React.useState<string[]>([])

  React.useEffect(() => {
    getGroupDetail()
    getGroupMembersList()
  }, [])

  const getGroupDetail = () => {
    group_detail({ group_id }).then((res) => {
      setGroupInfo(res.data)
      updateGroupList(res.data, null)
    })
  }

  const updateGroupList = (data: IGroup | null, tip: boolean | null) => {
    const arr: IFriend[] = [...friendList.data]
    for (let i = 0; i < friendList.data.length; i++) {
      if (friendList.data[i].id === group_id && friendList.data[i].type === 1) {
        if (data) {
          setNotification(friendList.data[i].notification)
          arr[i] = {
            ...friendList.data[i],
            friend_avatar: '',
            name: data.title,
            group_avatar: data.avatar,
          }
          set_group_avatar(data.avatar)
        } else if (tip !== null) {
          arr[i] = { ...friendList.data[i], notification: tip }
        }
        break
      }
    }
    dispatch(setFriends(arr))
  }

  const getGroupMembersList = () => {
    group_members_list({ group_id }).then(res => {
      const arr = Array.isArray(res.data) ? res.data : []
      setMembers(arr)
    })
  }

  const onPressAddPeople = () => {
    props.navigation.navigate('AddNewGroup', { group_id, group_name: groupInfo?.title })
  }

  const onPressMinusPeople = () => {
    setIsKicking(true)
  }

  const onPressDelete = (uid: string) => {
    group_kick_out({ user_id: uid, group_id }).then(res => {
      getGroupMembersList()
      toast.show({ description: res.msg })
    })
  }

  const onPressSeeMore = (open: boolean) => {
    if (open) {
      Animated.timing(hAnim, {
        toValue: startH,
        duration: 300,
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished) setOpenMem(b => !b);
      })
    } else {
      const lineNum = Math.ceil((members.length + 2) / 5)
      const endH = lineNum * ((width - 108) / 5 + 16) + lineNum * 18 + 18
      Animated.timing(hAnim, {
        toValue: endH,
        duration: 300,
        useNativeDriver: false
      }).start(({ finished }) => {
        if (finished) setOpenMem(b => !b);
      })
    }
  }

  const setGroupInfoApi = () => {
    const params: { group_id: string, title?: string, content?: string } = { group_id }
    if (title !== null) {
      params.title = title
    } else if (content !== null) {
      params.content = content
    }
    group_update(params).then(res => {
      getGroupDetail()
      onCloseModal()
    })
  }

  const onCloseModal = () => {
    setTitle(null)
    setContent(null)
  }

  const onValueChangeNotification = (tip: boolean) => {
    updateGroupList(null, tip)
    setNotification(tip)
  }

  const onPressLeave = () => {
    Alert.alert(
      "",
      `Leaving group chat.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Confirm", onPress: () => {
            exit_group({ group_id }).then((res) => {
              toast.show({ description: res.msg })
              finishDeleteOfLeave()
            })
          }
        }
      ]
    );
  }

  const onPressDeleteGroup = () => {
    Alert.alert(
      ``,
      `Deleting group chat.`,
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Leave", onPress: () => {
            group_dissolution({ group_id }).then((res) => {
              toast.show({ description: res.msg })
              finishDeleteOfLeave()
            })
          }
        }
      ]
    );
  }

  const finishDeleteOfLeave = () => {
    const arr = [...friendList.data]
    for (let i = 0; i < friendList.data.length; i++) {
      if (friendList.data[i].id.toString() === group_id.toString() && friendList.data[i].type === 1) {
        arr.splice(i, 1)
        break
      }
    }
    storage.remove({ key: MessageLogging + store.getState().myInfo.value.uid, id: 1 + group_id })
    storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
    dispatch(setFriends(arr))
    if (props.route.params.type === 1) {
      props.navigation.dispatch((state: any) => {
        const routes = [...state.routes.slice(0, -2)]
        return CommonActions.reset({
          ...state,
          routes,
          index: routes.length - 1,
        });
      })
    } else {
      props.navigation.goBack()
    }
  }

  return (
    <ImageBackground source={images.background1} style={styles.GroupInfo}>
      <Header title="Group information" titleStyle={styles.title} rightNode={
        <IconButton
          icon={<Icon as={<AntDesignIcon name='message1' />} />}
          borderRadius="full"
          _icon={{
            color: "#FFD27B",
            size: 'lg'
          }}
          onPress={() => {
            props.navigation.navigate('Chat', { type: 1, id: group_id, friend_avatar: '', group_avatar: groupInfo?.avatar, name: groupInfo?.title })
          }}
        />
      } />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Animated.View style={[styles.MembersList, { height: hAnim }]}>
            {
              members.map(item =>
                <Pressable key={item.id} style={styles.memberItem} onPress={() => props.navigation.navigate('UserInfo', { friend_id: Number(myInfo.uid) === Number(item.uid) ? '' : item.uid })}>
                  <Avatar source={{ uri: item.avatar }} size={(width - 108) / 5}>{item.username}</Avatar>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {
                      Number(groupInfo?.uid) === Number(item.uid) ?
                        <Image source={images.Vector} style={{ width: 8, height: 8, marginHorizontal: 2 }} /> :
                        null
                    }
                    <Title title={item.username} numberOfLines={1} style={styles.username} />
                  </View>

                  {
                    isKicking ?
                      <IconButton
                        icon={<Icon as={<AntDesignIcon name='close' />} />}
                        borderRadius="full"
                        _icon={{
                          color: "#fff",
                          size: 'sm'
                        }}
                        onPress={() => onPressDelete(item.uid)}
                        bgColor='#FFA800'
                        justifyContent='center'
                        alignItems='center'
                        style={styles.closeicon}
                        size={19}
                      /> :
                      null
                  }
                </Pressable>
              )
            }
            {
              isKicking ?
                null :
                <>
                  {
                    Number(groupInfo?.uid) === Number(myInfo.uid) ?
                      <View style={styles.memberItem}>
                        <IconButton
                          icon={<Icon as={<FeatherIcon name='minus' />} />}
                          borderRadius="full"
                          _icon={{
                            color: "#B5B7CA",
                            size: 'lg'
                          }}
                          onPress={onPressMinusPeople}
                          bgColor='#EFEFEF'
                          size={(width - 108) / 5}
                          justifyContent='center'
                          alignItems='center'
                        />
                        <Title numberOfLines={1} style={styles.username} />
                      </View> :
                      null
                  }
                  <View style={styles.memberItem}>
                    <IconButton
                      icon={<Icon as={<FeatherIcon name='plus' />} />}
                      borderRadius="full"
                      _icon={{
                        color: "#B5B7CA",
                        size: 'lg'
                      }}
                      onPress={onPressAddPeople}
                      bgColor='#EFEFEF'
                      size={(width - 108) / 5}
                      justifyContent='center'
                      alignItems='center'
                    />
                    <Title numberOfLines={1} style={styles.username} />
                  </View>
                </>
            }
          </Animated.View>
          {
            (members.length > 3 && Number(groupInfo?.uid) === Number(myInfo.uid)) || (members.length > 4 && Number(groupInfo?.uid) !== Number(myInfo.uid)) ?
              <Pressable style={styles.seemore} onPress={() => onPressSeeMore(openMem)}>
                <Text style={styles.text1}>{openMem ? 'Folded up' : 'See more group members'}</Text>
                <FeatherIcon name={openMem ? 'chevron-up' : 'chevron-down'} color='#666' size={16} />
              </Pressable> :
              null
          }
          <Divider />
          <Pressable style={styles.boxbutton} disabled={Number(groupInfo?.uid) !== Number(myInfo.uid)} onPress={() => setTitle(groupInfo?.title || '')}>
            <Text style={styles.text2}>Group Name</Text>
            <View style={styles.rightBox}>
              <Title title={groupInfo?.title} style={styles.text3} />
              <FeatherIcon name='chevron-right' color='#4B4B4B' size={16} />
            </View>
          </Pressable>
          <Divider />
          <Pressable style={styles.boxbutton} disabled={Number(groupInfo?.uid) !== Number(myInfo.uid)} onPress={() => setContent(groupInfo?.content || '')}>
            <Text style={styles.text2}>Pinned Message</Text>
            <FeatherIcon name='chevron-right' color='#4B4B4B' size={16} />
          </Pressable>
          <Text style={styles.text4}>{groupInfo?.content ? groupInfo?.content : <Text style={styles.text5}>No Pinned Message for now</Text>}</Text>
          <Divider />
          <Pressable style={styles.boxbutton} onPress={() => props.navigation.navigate('ChatHistory', { type: 1, id: group_id, friend_avatar: '', group_avatar: group_avatar, name: groupInfo?.title })}>
            <Text style={styles.text2}>Chat History</Text>
            <FeatherIcon name='chevron-right' color='#4B4B4B' size={16} />
          </Pressable>
          <Divider />
          <Pressable style={styles.boxbutton} disabled>
            <Text style={styles.text2}>Notification</Text>
            {
              notification === undefined ?
                null :
                <Switch defaultIsChecked={notification} onValueChange={onValueChangeNotification} />
            }
          </Pressable>
          <Divider />
          {
            Number(groupInfo?.uid) === Number(myInfo.uid) ?
              <>
                <Pressable style={styles.boxbutton} onPress={onPressDeleteGroup}>
                  <Text style={styles.text6}>Delete Group</Text>
                </Pressable>
                <Divider />
                <Pressable style={styles.boxbutton} onPress={onPressLeave}>
                  <Text style={styles.text6}>Leave Group</Text>
                </Pressable>
                <Divider />
              </> :
              <>
                <Pressable style={styles.boxbutton} onPress={onPressLeave}>
                  <Text style={styles.text6}>Leave Group</Text>
                </Pressable>
                <Divider />
              </>
          }
        </ScrollView>
      </ImageBackground>

      <Modal isOpen={title !== null || content !== null} onClose={onCloseModal}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{title !== null ? 'Edit group name' : (content !== null ? 'Edit Pinned Message' : '')}</Modal.Header>
          <Modal.Body>
            {
              title !== null ?
                <FormControl>
                  <FormControl.Label>Group Name</FormControl.Label>
                  <Input value={title || ''} onChangeText={text => setTitle(text)} />
                </FormControl> :
                (
                  content !== null ?
                    <FormControl>
                      <FormControl.Label>Pinned Message</FormControl.Label>
                      <TextArea value={content || ''} onChangeText={text => setContent(text)} autoCompleteType={undefined} />
                    </FormControl> :
                    null
                )
            }

          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button onPress={setGroupInfoApi}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </ImageBackground>
  )
}

export default GroupInfo;