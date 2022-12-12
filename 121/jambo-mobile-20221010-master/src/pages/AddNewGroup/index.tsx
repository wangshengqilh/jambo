import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FlatListVertical from "components/FlatListVertical";
import Title from "components/Title";
import MyCarousel from "components/MyCarousel";
import { ImageBackground } from "react-native";
import { Avatar, Button, Icon, IconButton, Input, Pressable, Text, useToast, View } from "native-base";
import { accurate_search, create_group, group_invitation, group_members_list, search_friend } from "src/store/api";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { IFriend, selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { store } from "src/store";
import { IMember } from "../GroupInfo";
import storage from "src/store/storage";
import { friends } from "src/assets/static";

interface ISearchFriend {
  avatar: string
  city: string
  country_name: string
  distance: number
  lat: string
  lon: string
  uid: string
  username: string
}

/**
 * 
 * @param props group_id?: string, group_name?: string    如果存在，则是添加群成员，如果不存在，则是新建群
 * @returns 
 */
function AddNewGroup(props: IProps) {
  const dispatch = useAppDispatch();
  const [data, setDate] = React.useState<ISearchFriend[]>([])
  const [total, setTotal] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [type, setType] = React.useState<0 | 1 | 2 | number>(0)
  const [email, setEmail] = React.useState<string>('')
  const [i, setI] = React.useState<number>(0)
  const typesHeader = [{ name: 'Friends', icon: 'users' }, { name: 'Nearby', icon: 'map-pin' }]
  const [members, setMembers] = React.useState<{ uid: string, avatar: string, username: string }[]>([])
  const [membersOld, setMembersOld] = React.useState<{ uid: string, avatar: string, username: string }[]>([])
  const friendList = useAppSelector(selectFriends);
  const toast = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const group_id = props.route.params?.group_id
  // const group_name = props.route.params?.group_name

  React.useEffect(() => {
    getDataApi()
  }, [page, setPage, i, setI])

  React.useEffect(() => {
    onRefresh()
  }, [type, setType])

  React.useEffect(() => {
    if (group_id) {
      getGroupMembersList()
    }
  }, [])

  const getGroupMembersList = () => {
    group_members_list({ group_id }).then(res => {
      const arr: IMember[] = Array.isArray(res.data) ? res.data : []
      const arr1: { uid: string, avatar: string, username: string }[] = []
      for (const item of arr) {
        arr1.push({ uid: item.uid, avatar: item.avatar, username: item.username })
      }
      setMembersOld(arr1)
    })
  }

  const getDataApi = () => {
    if (type === 0) {
      const arr: ISearchFriend[] = []
      for (const item of friendList.data) {
        if (item.type === 0) {
          arr.push({
            avatar: item.friend_avatar,
            city: '',
            country_name: item.country_name,
            distance: 0,
            lat: '',
            lon: '',
            uid: item.id,
            username: item.name,
          })
        }
      }
      setDate(arr)
    } else if (type === 1) {
      search_friend({ page, distance: 10, type: 2 }).then(res => {
        const arr = Array.isArray(res.data.result) ? res.data.result : []
        setDate(arr)
        setTotal(res.data.total)
      })
    }
  }

  const searEmail = () => {
    setType(3)
    accurate_search({ email }).then(res => {
      setDate([{
        avatar: res.data.avatar,
        city: '',
        country_name: res.data.country_name,
        distance: 0,
        lat: '',
        lon: '',
        uid: res.data.uid,
        username: res.data.username,
      }])
    })
  }

  const childrenComponent = (item: ISearchFriend) => {
    return (
      <View style={styles.itemchildren}>
        <View style={styles.itemchildrenleft}>
          <Pressable onPress={() => props.navigation.navigate('UserInfo', { friend_id: item.uid })}>
            <Avatar size={50} source={{ uri: item.avatar }}>
              {item.username}
            </Avatar>
          </Pressable>
          <View style={styles.namebox}>
            <Title style={styles.text1} title={item.username} numberOfLines={1} />
            <Text style={styles.text2}>{item.country_name}</Text>
          </View>
        </View>

        <Button isDisabled={isAdd(item.uid)} onPress={() => onPressAddFriend(item)}>Add</Button>
      </View>
    )
  }

  const isAdd = (uid: string) => {
    let b = false
    for (const item of [...membersOld, ...members]) {
      if (item.uid === uid) {
        b = true
        break
      }
    }
    return b
  }

  const onPressAddFriend = (item: ISearchFriend) => {
    setMembers(mem => {
      mem.push({ uid: item.uid, avatar: item.avatar, username: item.username })
      return [...mem]
    })
  }

  const onEndReached = () => {
    setPage(n => n + 1)
  }

  const onRefresh = () => {
    setPage(1)
    setDate([])
    setTotal(0)
    setI(num => num + 1)
  }

  const childrenComponentMember = (item: { uid: string, avatar: string, username: string }, index: number) => {
    return (
      <View style={styles.itemChildrenMember}>
        <Avatar source={{ uri: item.avatar }} size={50}>{item.username}</Avatar>
        <Title title={item.username} style={styles.title2} />
        {
          group_id ?
            null :
            <IconButton
              icon={<Icon as={<AntDesignIcon name='close' />} />}
              borderRadius="full"
              _icon={{
                color: "#fff",
                size: 'sm'
              }}
              onPress={() => {
                setMembers(mem => {
                  mem.splice(index, 1)
                  return [...mem]
                })
              }}
              bgColor='#FFA800'
              justifyContent='center'
              alignItems='center'
              style={styles.closeicon}
              size={19}
            />
        }
      </View>
    )
  }

  React.useEffect(() => {
    if (isLoading) {
      if (group_id) {
        addGroupPeople()
      } else {
        onPressCreateGroup()
      }
    }
  }, [isLoading, setIsLoading])

  const onPressCreateGroup = () => {
    const myInfo = store.getState().myInfo.value
    const ids = []
    const titles: string[] = []
    const groupAvatar: string[] = []
    for (const item of members) {
      ids.push(item.uid)
      titles.push(item.username)
      groupAvatar.push(item.avatar)
    }
    titles.unshift(myInfo.username)
    groupAvatar.unshift(myInfo.avatar)
    create_group({ uids: ids, title: titles.toString() }).then(res => {
      const arr: IFriend[] = [...friendList.data]
      arr.unshift({
        country_name: '',
        friend_avatar: '',
        id: res.data,
        name: titles.toString(),
        notification: true,
        group_avatar: groupAvatar.slice(0, 3),
        last_msg: `${titles.toString()} joined the chat!`,
        last_msg_type: 99,
        type: 1,
        unread: 0,
        relationship: true
      })
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr })
      dispatch(setFriends(arr))
      setIsLoading(false)
      props.navigation.goBack()
    }).catch(() => setIsLoading(false))
  }

  const addGroupPeople = () => {
    const ids = []
    for (const item of members) {
      ids.push(item.uid)
    }
    group_invitation({ uids: ids, group_id }).then(res => {
      toast.show({ description: res.msg })
      props.navigation.goBack()
      setIsLoading(false)
    }).catch(() => setIsLoading(false))
  }

  return (
    <ImageBackground source={images.background1} style={styles.AddNewGroup}>
      <Header title={group_id ? 'Add group members' : "New Group Chat"} titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <FlatListVertical
          data={data}
          childrenComponent={childrenComponent}
          total={total}
          spacing={0}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
          ListHeaderComponent={
            <View style={styles.ListHeaderComponent}>
              {/* <Title title={`Group Name (${group_name || members.map(item => item.username)})`} style={styles.title1} numberOfLines={1} /> */}
              <MyCarousel
                data={[...membersOld, ...members]}
                childrenComponent={childrenComponentMember}
                itemWidth={50}
                initialScrollIndex={0}
                width='100%'
              />
              <Input
                InputLeftElement={<Icon as={<FeatherIcon name="search" />} size={5} ml="2" />}
                placeholder={`Please enter email`}
                onChangeText={setEmail}
                onSubmitEditing={searEmail}
                returnKeyType='search'
                marginTop={18}
              />
              <View style={styles.headerItem}>
                {
                  typesHeader.map((item, index) =>
                    <Button
                      key={index}
                      bgColor={type === index ? '#FFA800' : '#FFD27B'}
                      leftIcon={
                        <Icon as={<FeatherIcon name={item.icon} />} size="sm" color='#fff' />
                      }
                      style={styles.button}
                      onPress={() => setType(index)}
                    >
                      <Title style={styles.searchtitle} title={item.name} />
                    </Button>
                  )
                }
              </View>
            </View>
          }
          paddingBottom={80}
        />
        {
          members.length === 0 ?
            null :
            <Button isLoading={isLoading} style={styles.createbutton} onPress={() => setIsLoading(true)}>Add to group</Button>
        }
      </ImageBackground>
    </ImageBackground>
  )
}

export default AddNewGroup;