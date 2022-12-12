import styles from './style';
import IProps from 'src/IProps';
import storage from 'src/store/storage';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Title from 'components/Title';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import React, { useState, useEffect } from 'react'
import { Bubble, GiftedChat, IMessage } from 'react-native-gifted-chat'
import { ActivityIndicator, Pressable, StatusBar, View } from 'react-native';
import { MessageLogging } from 'src/assets/static';
import { Avatar, Box, Button, Icon, IconButton, Text, ZStack } from 'native-base';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { store } from 'src/store';

type TMessage = IMessage & { s?: 0 | 1 | 2 }
export interface IChatInfo {
  type: 0 | 1
  id: string
  friend_avatar: string
  group_avatar: string[]
  name: string
}
/**
 * 
 * @param props type  id friend_avatar group_avatar name
 * @returns 
 */
export default function ChatHistory(props: IProps) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const [date, setDate] = useState<string>('')
  const chat_info: IChatInfo = props.route.params
  const [msgDate, setMsgDate] = useState<TMessage[]>([]);

  useEffect(() => {
    getMsgHistory()
    StatusBar.setBarStyle('dark-content')
    return () => {
      StatusBar.setBarStyle('default')
    }
  }, [])

  const getMsgHistory = () => {
    storage.load({
      key: MessageLogging + store.getState().myInfo.value.uid,
      id: props.route.params.type + props.route.params.id,
    }).then(ret => {
      setMessages(ret)
    })
  }

  const renderInputToolbar = () => (
    <View style={styles.inputView}>
      <Button flex={1} onPress={onPressDate}>{date ? date : 'Date'}</Button>
    </View>
  )

  const onPressDate = () => {
    DateTimePickerAndroid.open({
      value: new Date(),
      mode: 'date',
      maximumDate: new Date(),
      display: 'spinner',
      onChange: (_event: DateTimePickerEvent, dateC: Date | undefined) => {
        if (dateC) {
          const d = moment(dateC).format('YYYY-MM-DD')
          setDate(d)
          const arr = []
          for (const item of messages) {
            if (d === moment(item.createdAt).format('YYYY-MM-DD')) {
              arr.push(item)
            }
          }
          setMsgDate(arr)
        }
      }
    })
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
          <Text style={{ color: 'red', fontSize: 9, marginRight: 10 }}>Message sending failure</Text> :
          <Text />
    )
  }

  const onPressGoBack = () => {
    props.navigation.goBack()
  }

  return (
    <LinearGradient colors={['#FFFFFF', '#EDD3FF']} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={styles.ChatHistory}>
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
        <Pressable style={styles.header_box} disabled>
          {
            chat_info.type === 0 ?
              <Avatar source={{ uri: chat_info.friend_avatar }} size={42} /> :
              <View style={styles.avatarView}>
                <ZStack ml={4}>
                  {
                    chat_info.group_avatar.map((ite, i) => (
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

      <GiftedChat
        renderAvatar={() => null}
        messages={msgDate}
        alwaysShowSend
        renderUsernameOnMessage
        wrapInSafeArea={false}
        renderInputToolbar={renderInputToolbar}
        minInputToolbarHeight={82}
        keyboardShouldPersistTaps='never'
        renderBubble={renderBubble}
        showAvatarForEveryMessage={true}
        renderTicks={renderTicks}
        user={{
          _id: store.getState().myInfo.value.uid.toString()
        }}
      />
    </LinearGradient>
  )
}