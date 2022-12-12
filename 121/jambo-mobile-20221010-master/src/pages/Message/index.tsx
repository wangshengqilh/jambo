import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import FeatherIcon from 'react-native-vector-icons/Feather';
import MyCarousel from "components/MyCarousel";
import { Avatar, Badge, Box, Divider, Icon, IconButton, Image, Menu, Pressable, Text, View, ZStack } from "native-base";
import { Dimensions, FlatList, ImageBackground, RefreshControl, StatusBar } from "react-native";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { IFriend, selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { selectApply } from "src/store/apply/applySlice";
import { my_friends_list } from "src/store/api";
import storage from "src/store/storage";
import { friends } from "src/assets/static";
import { store } from "src/store";

const { width, height } = Dimensions.get('screen')

function Message(props: IProps) {
  const [num, setNum] = React.useState<number>(0)
  const [type, setType] = React.useState<number | 0 | 1>(0);
  const friendList = useAppSelector(selectFriends);
  const apply = useAppSelector(selectApply);
  const [msgList, setMsgList] = React.useState<IFriend[]>([])
  let onRef: { openPage: (arg0: number) => void; } | null = null
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    let arr = []
    for (const item of friendList.data) {
      if (item.last_msg) {
        arr.push(item)
      }
    }
    setMsgList(arr)
  }, [friendList])

  React.useEffect(() => {
    let i = 0
    for (const item of apply.data) {
      if (item.state === 0) {
        i++
      }
    }
    setNum(i)
  }, [apply])

  const onPressItemMsg = (item: IFriend) => {
    props.navigation.navigate('Chat', item)
  }

  const onRefreshFriend = () => {
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
      const arr3: IFriend[] = [...arr2, ...friendList.data]
      if (arr2.length) {
        for (let i = 0; i < arr3.length; i++) {
          for (let j = i + 1; j < arr3.length; j++) {
            if (arr3[i].id.toString() === arr3[j].id.toString() && arr3[i].type === arr3[j].type) {
              arr3.splice(j, 1);
              j--;
            }
          }
        }
      } else {
        for (let i = 0; i < arr3.length; i++) {
          if (arr3[i].type === 0) {
            arr3.splice(i, 1);
            i--;
          }
        }
      }
      for (let i = 0; i < arr3.length; i++) {
        if (arr3[i].type === 0 && arr3[i].relationship === false) {
          arr3.splice(i, 1);
          i--;
        }
      }
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr3 })
      dispatch(setFriends(arr3))
    })
  }

  const renderItemMessages = ({ item }: { item: IFriend }) => {
    let newMsg = ''
    switch (item.last_msg_type) {
      case 0:
        // 0文本
        newMsg = item.last_msg
        break
      case 1:
        // 1图片
        newMsg = 'image'
        break
      case 99:
        // 99系统消息
        newMsg = item.last_msg
        break
    }
    if (item.type === 0) {
      // 单聊
      return (
        <Pressable style={styles.msgItem} onPress={() => onPressItemMsg(item)}>
          <View style={styles.msgItemLeft}>
            <Avatar source={{ uri: item.friend_avatar }} size={50}>
              {item.name}
            </Avatar>
            <View style={styles.nameView}>
              <Title style={styles.nameText} title={item.name} numberOfLines={1} />
              <Text numberOfLines={1}>{newMsg}</Text>
            </View>
          </View>
          {
            item.unread ?
              <Badge colorScheme="danger" width={30} rounded='full' variant="solid" alignSelf='center'>{item.unread}</Badge> :
              null
          }
        </Pressable>
      )
    }
    // 群聊
    return (
      <Pressable style={styles.msgItem} onPress={() => onPressItemMsg(item)}>
        <View style={styles.msgItemLeft}>
          <View style={styles.avatarView}>
            <ZStack ml={4}>
              {
                (item.group_avatar && Array.isArray(item.group_avatar) ? item.group_avatar : []).map((ite, i) => (
                  ite ?
                    <Box key={i}>
                      <Avatar borderWidth={1} mt={i * 2} ml={-i * 2} source={{ uri: ite }} size={30}>
                        {item.name}
                      </Avatar>
                    </Box> :
                    null
                ))
              }
            </ZStack>
          </View>
          <View style={styles.nameView}>
            <Title style={styles.nameText} title={item.name} numberOfLines={1} />
            <Text numberOfLines={1}>{newMsg}</Text>
          </View>
        </View>
        {
          item.unread ?
            <Badge colorScheme="danger" width={30} rounded='full' variant="solid" alignSelf='center'>{item.unread}</Badge> :
            null
        }
      </Pressable>
    )
  }

  const renderItemFriends = ({ item }: { item: IFriend }) => {
    if (item.type === 0 && item.relationship) {
      return (
        <Pressable style={styles.msgItem} onPress={() => props.navigation.navigate('UserInfo', { friend_id: item.id })}>
          <View style={styles.msgItemLeft}>
            <Avatar source={{ uri: item.friend_avatar }} size={50}>
              {item.name}
            </Avatar>
            <View style={styles.nameView}>
              <Title style={styles.nameText} title={item.name} numberOfLines={1} />
              <Text numberOfLines={1}>{item.country_name}</Text>
            </View>
          </View>
        </Pressable>
      )
    }
    return null
  }

  const currentCallback = (current: 0 | 1 | number) => {
    setType(current)
  }

  const onPressTypePage = (index: 0 | 1) => {
    setType(index)
    onRef?.openPage(index)
  }

  const onPressGroup = () => {
    props.navigation.navigate('Groups')
  }

  const onPressNewFriends = () => {
    props.navigation.navigate('Apply')
  }

  return (
    <ImageBackground source={images.background1} style={styles.Message}>
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Title style={{ fontSize: 20, marginRight: 9, color: type === 0 ? '#FFA800' : '#fff' }} onPress={() => onPressTypePage(0)} title='Messages' />
          <Title style={{ fontSize: 20, marginRight: 9, color: type === 1 ? '#FFA800' : '#fff' }} onPress={() => onPressTypePage(1)} title='Friends' />
        </View>
        <View style={styles.headerItem}>
          <Menu
            trigger={triggerProps =>
              <>
                {
                  num ?
                    <View style={{ backgroundColor: 'red', width: 6, height: 6, borderRadius: 3, position: 'absolute', right: 4, top: 4 }} /> :
                    null
                }
                <IconButton
                  {...triggerProps}
                  icon={<Icon as={<FeatherIcon name='user-plus' />} />}
                  borderRadius="full"
                  _icon={{
                    color: "#FFD27B",
                    size: 'lg'
                  }}
                />
              </>
            }
          >
            <Menu.Item onPress={() => props.navigation.navigate('AddNewFriend')}>Add Friend</Menu.Item>
            <Divider />
            <Menu.Item onPress={() => props.navigation.navigate('AddNewGroup')}>New Group Chat</Menu.Item>
            <Divider />
            <Menu.Item onPress={onPressNewFriends}>New Friends</Menu.Item>
            {
              num ?
                <Text style={styles.numApply}>{num > 99 ? '99+' : num}</Text> :
                null
            }
          </Menu>
        </View>
      </View>

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <MyCarousel
          data={[0, 1]}
          childrenComponent={(item) => {
            switch (item) {
              case 0:
                return (
                  <FlatList
                    data={msgList}
                    renderItem={renderItemMessages}
                    keyExtractor={item => item.id}
                    ListFooterComponent={<View style={styles.bottomView} />}
                    ListEmptyComponent={<Text style={{ lineHeight: 100, textAlign: 'center', color: '#999' }}>Start a conversation!</Text>}
                  />
                )
              case 1:
                return (
                  <FlatList
                    data={friendList.data}
                    renderItem={renderItemFriends}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={
                      <Pressable style={styles.msgItem} onPress={onPressGroup}>
                        <View style={styles.msgItemLeft}>
                          <Image source={images.Group} style={styles.Groupimg} />
                          <Title title='My Group' style={styles.nameText} />
                        </View>
                        <FeatherIcon name="chevron-right" />
                      </Pressable>
                    }
                    ListFooterComponent={<View style={styles.bottomView} />}
                    refreshControl={<RefreshControl refreshing={false} onRefresh={onRefreshFriend} />}
                  />
                )
            }
          }}
          itemWidth={width}
          itemHeight={height - (18 + 18 + (StatusBar.currentHeight || 0) + 44 + 92)}
          initialScrollIndex={0}
          spacing={0}
          currentCallback={currentCallback}
          onRef={r => onRef = r}
        />
      </ImageBackground>
    </ImageBackground>
  )
}

export default Message;