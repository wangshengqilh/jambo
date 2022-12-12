import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import Title from "components/Title";
import { FlatList, ImageBackground, RefreshControl } from "react-native";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Avatar, Box, Pressable, View, ZStack } from "native-base";
import { IFriend, selectFriends, setFriends } from "src/store/friends/friendsSlice";
import { my_group_list } from "src/store/api";
import { store } from "src/store";
import storage from "src/store/storage";
import { friends } from "src/assets/static";

function Groups(props: IProps) {
  const friendList = useAppSelector(selectFriends);
  const dispatch = useAppDispatch();

  const renderItemGroups = ({ item }: { item: IFriend }) => {
    if (item.type === 1) {
      return (
        <Pressable style={styles.item} onPress={() => props.navigation.navigate('GroupInfo', { group_id: item.id })}>
          <View style={styles.avatarView}>
            <ZStack ml={4}>
              {
                (item.group_avatar && Array.isArray(item.group_avatar) ? item.group_avatar : []).map((ite, i) => (
                  ite ?
                    <Box key={i}>
                      <Avatar borderWidth={1} borderColor='amber.100' mt={i * 2} ml={-i * 2} source={{ uri: ite }} size={30}>
                        {item.name}
                      </Avatar>
                    </Box> :
                    null
                ))
              }
            </ZStack>
          </View>
          <Title style={styles.name} title={item.name} numberOfLines={1} />
        </Pressable>
      )
    }
    return null
  }

  const upload = () => {
    my_group_list().then(res2 => {
      const arr1 = Array.isArray(res2.data) ? res2.data : []
      const arr2: IFriend[] = []
      for (const item of arr1) {
        arr2.push({
          country_name: '',
          friend_avatar: '',
          id: item.id,
          name: item.title,
          notification: true,
          group_avatar: item.avatar,
          last_msg: '',
          last_msg_type: 0,
          type: 1,
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
        for (let i = 0; i < arr3.length; i++) {
          if (arr3[i].type === 1 && arr3[i].relationship === false) {
            arr3.splice(i, 1);
            i--;
          }
        }
      } else {
        for (let i = 0; i < arr3.length; i++) {
          if (arr3[i].type === 1) {
            arr3.splice(i, 1);
            i--;
          }
        }
      }
      for (let i = 0; i < arr3.length; i++) {
        if (arr3[i].type === 1 && arr3[i].relationship === false) {
          arr3.splice(i, 1);
          i--;
        }
      }
      storage.save({ key: friends + store.getState().myInfo.value.uid, data: arr3 })
      dispatch(setFriends(arr3))
    })
  }

  const onRefresh = () => {
    upload()
  }

  return (
    <ImageBackground source={images.background1} style={styles.Groups}>
      <Header title="My Group" titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <FlatList
          data={friendList.data}
          renderItem={renderItemGroups}
          keyExtractor={item => item.id}
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        />
      </ImageBackground>
    </ImageBackground>
  )
}

export default Groups;