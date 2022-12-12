import React from 'react';
import styles from './style';
import IProps from 'src/IProps';
import Header from 'components/Header';
import images from 'src/assets/images';
import FeatherIcon from 'react-native-vector-icons/Feather'
import { FlatList, ImageBackground, RefreshControl, View } from 'react-native';
import { country_list } from 'src/store/api';
import { Icon, Input, Pressable, Text } from 'native-base';

/**
 * 
 * @param callback: (data: {country_id: string, country_name: string }) => void
 */
const AreaCode = (props: IProps) => {
  const [data, setData] = React.useState<Array<{ nicename: string, phonecode: string, id: string }>>([])
  const [refreshing, setRefreshing] = React.useState(false);
  const [search, setSearch] = React.useState<string>('')

  const get_phone_code = () => {
    setRefreshing(true)
  }

  React.useEffect(() => {
    if (refreshing) {
      country_list().then(res => {
        const arr = Array.isArray(res.data) ? res.data : []
        setData(arr)
        setRefreshing(false)
      }).catch((err) => {
        setRefreshing(false)
      })
    }
  }, [refreshing, setRefreshing])

  React.useEffect(() => {
    get_phone_code()
  }, [])

  const onRefresh = React.useCallback(() => {
    get_phone_code()
  }, []);

  const changeCode = (item: { phonecode: string, nicename: string, id: string }) => {
    props.route.params?.callback({ country_id: item.id, country_name: item.nicename, phonecode: item.phonecode })
    props.navigation.goBack()
  }

  return (
    <ImageBackground source={images.background1} style={styles.AreaCode}>
      <Header title="Select country" titleStyle={styles.title} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <FlatList
          style={styles.scrollView}
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => {
            if (item.nicename.indexOf(search) !== -1) {
              let phonecode = ''
              if (item.phonecode.length === 4) {
                const arr = item.phonecode.split('')
                arr.splice(1, 0, ' ')
                phonecode = arr.join('')
              } else {
                phonecode = item.phonecode
              }
              return (
                <Pressable onPress={() => changeCode(item)}>
                  <View style={styles.item}>
                    <Text numberOfLines={2} style={{ width: '60%' }}>{item.nicename}</Text>
                    <Text>+{phonecode}</Text>
                  </View>
                </Pressable>
              )
            }
            return null
          }}
          keyExtractor={(item, index) => item.phonecode + index}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <Input InputLeftElement={<Icon as={<FeatherIcon name="search" />} ml="2" />} placeholder="Name" value={search} onChangeText={setSearch} />
          }
        />
      </ImageBackground>
    </ImageBackground>
  );
}

export default AreaCode;