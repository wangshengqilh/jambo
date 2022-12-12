import styles from './style';
import Upload from 'src/components/Upload';
import IProps from 'src/IProps';
import storage from 'src/store/storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Title from 'components/Title';
import LinearGradient from 'react-native-linear-gradient';
import React, { useState, useEffect } from 'react'
import { Bubble, GiftedChat, IMessage, SystemMessageProps } from 'react-native-gifted-chat'
import { ActivityIndicator, StatusBar, TextInput, View } from 'react-native';
import { selectMyInfo } from 'src/store/myInfo/myInfoSlice';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { friends, MessageLogging } from 'src/assets/static';
import { group_detail, msg_detail_list, send_msg } from 'src/store/api';
import { Avatar, Box, Icon, IconButton, InfoIcon, Input, Pressable, Text, ZStack } from 'native-base';
import { IFriend, selectFriends, setFriends } from 'src/store/friends/friendsSlice';
import { store } from 'src/store';
import { selectNewMsg } from 'src/store/newMsg/newMsgSlice';
import { IChatInfo } from '../ChatHistory';

type TMessage = IMessage & { s?: 0 | 1 | 2 }

let timer: NodeJS.Timer | null = null

/**
 * 
 * @param props type  id friend_avatar group_avatar name
 * @returns 
 */
export default function Chat(props: IProps) {
  const dispatch = useAppDispatch();
  const friendList = useAppSelector(selectFriends);
  const [messages, setMessages] = useState<TMessage[]>([]);
  const userInfo = useAppSelector(selectMyInfo);
  const [sendMsg, setSendMsg] = useState<string>('')
  const [visibleUploadImg, setVisibleUploadImg] = useState<boolean>(false)
  const chat_info: IChatInfo = props.route.params
  const newMsg = useAppSelector(selectNewMsg)
  const [init, setInit] = useState<boolean>(false)
  let sendInput: TextInput | null = null
  const [content, setContent] = React.useState<string>('')
  const [isShow, setIsShow] = useState<boolean>(true)

  useEffect(() => {
    if (chat_info.type === 1) {
      props.navigation.addListener('focus', getGroupDetail)
    }
    getMsgHistory()
    StatusBar.setBarStyle('dark-content')
    return () => {
      timer && clearTimeout(timer);
      StatusBar.setBarStyle('default')
    }
  }, [])

  const getGroupDetail = () => {
    group_detail({ group_id: chat_info.id }).then((res) => {
      setContent(res.data.content)
    })
  }

  useEffect(() => {
    if (init) {
      getMsgDetailList()
    }
  }, [newMsg, init, setInit])

  useEffect(() => {
    if (messages.length) {
      storage.save({
        key: MessageLogging + store.getState().myInfo.value.uid,
        id: chat_info.type + chat_info.id,
        data: messages
      })
    }
  }, [messages, setMessages])

  const onPressOpenMenu = () => {
    if (chat_info.type === 0) {
      props.navigation.navigate('UserInfo', { friend_id: chat_info.id })
    } else if (chat_info.type === 1) {
      props.navigation.navigate('GroupInfo', { group_id: chat_info.id, type: 1 })
    }
  }

  const getMsgHistory = () => {
    storage.load({
      key: MessageLogging + store.getState().myInfo.value.uid,
      id: chat_info.type + chat_info.id,
    }).then(ret => {
      setMessages(ret)
      setInit(true)
    }).catch(() => setInit(true))
  }

  const getMsgDetailList = () => {
    msg_detail_list({ type: chat_info.type, type_id: chat_info.id }).then(res => {
      const arr = Array.isArray(res.data) ? res.data : []
      const arr1: IMessage[] = []
      for (const item of arr) {
        arr1.unshift({
          _id: item.id,
          createdAt: new Date(item.createtime),
          text: (item.mtype === '0' || item.mtype === '99') ? item.msg : '',
          image: item.mtype === '1' ? item.msg : '',
          system: item.mtype === '99',
          user: {
            _id: item.f_uid.toString(),
            avatar: item.friend_avatar,
            name: item.friend_username
          },
        })
      }
      if (arr1.length) {
        setMessages(previousMessages => GiftedChat.append(previousMessages, arr1))
        arr.length && sorting(arr[arr.length - 1].msg, arr[arr.length - 1].mtype, true)
      }
    })
  }

  const sorting = (msg: string, last_msg_type: number, relationship: boolean) => {
    const arr: IFriend[] = [...friendList.data]
    for (let i = 0; i < friendList.data.length; i++) {
      if (friendList.data[i].id === chat_info.id && chat_info.type === friendList.data[i].type) {
        const ite = arr.splice(i, 1)
        arr.unshift({ ...ite[0], last_msg: msg, last_msg_type: Number(last_msg_type), unread: 0, relationship })
        break
      }
    }
    storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
    dispatch(setFriends(arr))
  }

  const onSend = () => {
    const dateTime = new Date()
    const id = dateTime.getTime().toString()
    setMessages(previousMessages => GiftedChat.append(previousMessages, [{
      _id: id,
      createdAt: dateTime,
      text: sendMsg,
      user: {
        _id: userInfo.uid.toString(),
        avatar: userInfo.avatar,
        name: userInfo.username
      },
      image: '',
      s: 0
    }]))
    sendMsgFun(0, id)
  }

  const sendMsgFun = (msg_type: 0 | 1, id: string, img?: string, text?: string) => {
    const msg = msg_type === 0 ? (sendMsg || text || '') : (img || '')
    send_msg({ type_id: chat_info.id, type: chat_info.type, msg, msg_type }).then((res) => {
      setMessages(previousMessages => {
        const arr = [...previousMessages]
        for (let i = 0; i < previousMessages.length; i++) {
          if (previousMessages[i]._id === id) {
            arr[i] = {
              ...previousMessages[i],
              s: 1
            }
            break
          }
        }
        return arr
      })
      sorting(msg, msg_type, true)
    }).catch((err) => {
      const date = new Date()
      if (err.state === 3) {
        // 3与对方不是好友状态
        setMessages(previousMessages => {
          for (let i = 0; i < previousMessages.length; i++) {
            if (previousMessages[i]._id === id) {
              previousMessages[i].s = 2
              break
            }
          }
          return GiftedChat.append(previousMessages, [{
            _id: date.getTime().toString(),
            createdAt: date,
            text: `You are not friend with ${chat_info.name}`,
            system: true,
            user: {
              _id: chat_info.id.toString()
            },
          }])
        })
        sorting(`You are not friend with ${chat_info.name}`, msg_type, false)
      } else if (err.state === 4) {
        // 4群已解散
        setMessages(previousMessages => {
          for (let i = 0; i < previousMessages.length; i++) {
            if (previousMessages[i]._id === id) {
              previousMessages[i].s = 2
              break
            }
          }
          return GiftedChat.append(previousMessages, [{
            _id: date.getTime().toString(),
            createdAt: date,
            text: 'The group has since been disbanded.',
            system: true,
            user: {
              _id: chat_info.id.toString()
            }
          }])
        })
        sorting('The group has since been disbanded.', msg_type, false)
      } else if (err.state === 5) {
        // 5不在这个群里边
        setMessages(previousMessages => {
          for (let i = 0; i < previousMessages.length; i++) {
            if (previousMessages[i]._id === id) {
              previousMessages[i].s = 2
              break
            }
          }
          return GiftedChat.append(previousMessages, [{
            _id: date.getTime().toString(),
            createdAt: date,
            text: 'You have been removed from the group chat.',
            system: true,
            user: {
              _id: chat_info.id.toString()
            }
          }])
        })
        sorting('You have been removed from the group chat', msg_type, false)
      } else {
        setMessages(previousMessages => {
          for (let i = 0; i < previousMessages.length; i++) {
            if (previousMessages[i]._id === id) {
              previousMessages[i].s = 2
              break
            }
          }
          return GiftedChat.append(previousMessages, [{
            _id: date.getTime(),
            createdAt: date,
            text: 'An unknown error.',
            system: true,
            user: {
              _id: chat_info.id.toString()
            }
          }])
        })
      }
    })
    setSendMsg('')
  }

  const onPressImgOpen = () => {
    sendInput?.blur()
    setVisibleUploadImg(true)
  }

  const onChangeTextMsg = (text: string) => {
    if (text.includes('⊙ω⊙')) {
    } else {
      setSendMsg(text)
    }
  }

  const renderInputToolbar = () => (
    <View style={styles.inputView}>
      <IconButton
        icon={<Icon as={<FeatherIcon name='image' />} />}
        borderRadius="full"
        _icon={{
          color: "#FFD27B",
          size: 'lg'
        }}
        onPress={onPressImgOpen}
        marginRight={2}
      />
      <Input
        InputRightElement={
          <IconButton
            icon={<Icon as={<FontAwesomeIcon name='send' />} />}
            borderRadius="full"
            _icon={{
              color: "#461A86"
            }}
            disabled={!sendMsg}
            onPress={onSend}
          />
        }
        onChangeText={onChangeTextMsg}
        borderRadius={22}
        flex={1}
        value={sendMsg}
        ref={(r: TextInput) => sendInput = r}
      />
    </View>
  )

  const callbackUploadImg = (data: string[]) => {
    const dateTime = new Date()
    const id = dateTime.getTime().toString()
    setMessages(previousMessages => GiftedChat.append(previousMessages, [{
      _id: id,
      createdAt: dateTime,
      text: '',
      user: {
        _id: userInfo.uid.toString(),
        avatar: userInfo.avatar,
        name: userInfo.username
      },
      image: data[0],
      s: 0
    }]))
    sendMsgFun(1, id, data[0])
  }

  const closeModalUploadImg = () => {
    setVisibleUploadImg(false)
  }

  const renderBubble = (data: Bubble<IMessage>['props']) => {
    return (
      <Bubble
        {...data}
        inverted
        wrapperStyle={{
          left: { //对方的气泡
            backgroundColor: '#FFF',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 18,
          },
          right: { //我方的气泡
            backgroundColor: '#4F009E',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 4
          }
        }}
      />
    )
  }

  const renderTicks = (e: TMessage) => {
    return (
      e.s === 0 ?
        <ActivityIndicator size={9} animating={true} style={{ marginRight: 10 }} color='#fff' /> :
        e.s === 2 ?
          <Pressable style={{ position: 'absolute', left: -20 }} onPress={() => onAgainSend(e)}>
            <InfoIcon style={{ color: 'red', fontSize: 18 }} />
          </Pressable> :
          <Text />
    )
  }

  const onAgainSend = (e: TMessage) => {
    const dateTime = new Date()
    const id = dateTime.getTime().toString()
    setMessages(previousMessages => GiftedChat.append(previousMessages, [{
      _id: id,
      createdAt: dateTime,
      text: e.text,
      image: e.image,
      user: {
        _id: userInfo.uid.toString(),
        avatar: userInfo.avatar,
        name: userInfo.username
      },
      s: 0
    }]))
    sendMsgFun(e.text ? 0 : 1, id, e.image, e.text)
  }

  const onPressGoBack = () => {
    props.navigation.goBack()
  }

  const renderSystemMessage = (sysProps: SystemMessageProps<TMessage>) => {
    return <Text style={{ textAlign: 'center', color: '#999' }}>{sysProps.currentMessage?.text}</Text>
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#EDD3FF']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.Chat}>
      <View style={styles.header}>
        <IconButton
          icon={<Icon as={<FeatherIcon name='arrow-left' />} />}
          borderRadius="full"
          _icon={{
            color: "#FFD27B",
            size: 'lg'
          }}
          onPress={onPressGoBack}
        />
        <Pressable style={styles.header_box} onPress={onPressOpenMenu}>
          {
            chat_info.type === 0 ?
              <Avatar source={{ uri: chat_info.friend_avatar }} size={50} /> :
              <View style={styles.avatarView}>
                <ZStack ml={4}>
                  {
                    (Array.isArray(chat_info.group_avatar) ? chat_info.group_avatar : []).map((ite, i) => (
                      ite ?
                        <Box key={i}>
                          <Avatar borderWidth={1} borderColor='amber.100' mt={i * 2} ml={-i * 2} source={{ uri: ite }} size={30} />
                        </Box> :
                        null
                    ))
                  }
                </ZStack>
              </View>
          }

          <Title title={chat_info.name} style={styles.title} numberOfLines={1} />
        </Pressable>
      </View>

      {
        isShow && chat_info.type === 1 && content ?
          <Pressable style={styles.content} onPress={() => setIsShow(false)}>
            <Text style={styles.contentText}>{content}</Text>
          </Pressable> :
          null
      }

      <GiftedChat
        renderAvatar={() => null}
        messages={messages}
        alwaysShowSend
        renderUsernameOnMessage
        wrapInSafeArea={false}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={86}
        keyboardShouldPersistTaps='never'
        renderBubble={renderBubble}
        showAvatarForEveryMessage={true}
        renderTicks={renderTicks}
        renderSystemMessage={renderSystemMessage}
        user={{
          _id: userInfo.uid.toString()
        }}
      />

      <Upload
        visible={visibleUploadImg}
        mediaType='photo'
        callback={callbackUploadImg}
        closeModal={closeModalUploadImg}
      />
    </LinearGradient>
  )
}