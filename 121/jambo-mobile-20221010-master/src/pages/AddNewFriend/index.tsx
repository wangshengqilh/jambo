import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FlatListVertical from "components/FlatListVertical";
import Title from "components/Title";
import uploadLocation from "src/tool/location";
import { ImageBackground } from "react-native";
import { Avatar, Button, Icon, Input, Pressable, Text, View } from "native-base";
import { accurate_search, search_friend } from "src/store/api";

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

function AddNewFriend(props: IProps) {
  const [data, setDate] = React.useState<ISearchFriend[]>([])
  const [total, setTotal] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [type, setType] = React.useState<0 | 1 | 2 | number>(0)
  const [country_id, setCountry_id] = React.useState<string>('')
  const [country_name, setCountry_name] = React.useState<string>('')
  const [email, setEmail] = React.useState<string>('')
  const [i, setI] = React.useState<number>(0)
  const typesHeader = [{ name: 'Nearby', icon: 'map-pin' }, { name: 'Country', icon: 'globe' }, { name: 'Email', icon: 'mail' }]

  React.useEffect(() => {
    if (i !== 0) {
      getDataApi()
    }
  }, [page, setPage, i, setI])

  React.useEffect(() => {
    onRefreshData()
  }, [type, setType])

  const getDataApi = () => {
    if (type === 0 || type === 1) {
      search_friend({ page, country_id, distance: 10, type: type === 0 ? 2 : 1 }).then(res => {
        const arr = Array.isArray(res.data.result) ? res.data.result : []
        setDate(d => [...d, ...arr])
        setTotal(res.data.total)
      })
    }
  }

  const searEmail = () => {
    accurate_search({ email }).then(res => {
      if (res.data && !Array.isArray(res.data)) {
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
      }
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

        <Button onPress={() => onPressAddFriend(item.uid)}>Add</Button>
      </View>
    )
  }

  const onPressAddFriend = (friend_id: string) => {
    props.navigation.navigate('ApplyAdd', { friend_id, address: type === 0 ? 1 : 0 })
  }

  const onEndReached = () => {
    setPage(n => n + 1)
  }

  const onRefreshData = () => {
    setPage(1)
    setDate([])
    setTotal(0)
    setI(num => num + 1)
  }

  const onRefresh = () => {
    if (type === 0) {
      uploadLocation().then(() => {
        onRefreshData()
      })
    } else {
      onRefreshData()
    }
  }

  const onPressChangeCountry = () => {
    props.navigation.navigate('AreaCode', { callback: callbackCountry })
  }

  const callbackCountry = (data: { country_id: string, country_name: string }) => {
    setCountry_id(data.country_id)
    setCountry_name(data.country_name)
    onRefreshData()
  }

  return (
    <ImageBackground source={images.background1} style={styles.AddNewFriend}>
      <Header title="Add New Friend" titleStyle={styles.title} />

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
              {
                type === 2 ?
                  <Input
                    InputLeftElement={<Icon as={<FeatherIcon name="search" />} size={5} ml="2" />}
                    placeholder={`Please enter ${typesHeader[type].name}`}
                    onChangeText={setEmail}
                    onSubmitEditing={searEmail}
                    returnKeyType='search'
                    keyboardType='email-address'
                  /> :
                  type === 1 ?
                    <Pressable style={styles.country} onPress={onPressChangeCountry}>
                      <Text style={styles.countrytext}>{country_id ? country_name : 'Please select a country'}</Text>
                    </Pressable> :
                    null
              }
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
        />
      </ImageBackground>
    </ImageBackground>
  )
}

export default AddNewFriend;