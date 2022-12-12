import React from "react";
import styles from "./style";
import MyCarousel from "components/MyCarousel";
import images from "src/assets/images";
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Button, Icon, IconButton, Image, View } from "native-base";
import { Dimensions, ImageSourcePropType } from "react-native";
import { logOut } from "src/router/customNavigation";

const { width, height } = Dimensions.get('screen')

function Guide() {
  const [current, setCurrent] = React.useState(0)
  const data = [images.guide1, images.guide2, images.guide3, images.guide4]
  let refMyCarousel: any

  const childrenComponent = (item: ImageSourcePropType, index: number) => {
    return (
      <Image source={item} style={styles.img} alt={index.toString()} />
    )
  }

  const currentCallback = (current: number) => {
    setCurrent(current)
  }

  const onRef = (node: any) => {
    refMyCarousel = node
  }

  const onPressPre = () => {
    refMyCarousel?.onPressPre()
  }

  const onPressSkip = () => {
    logOut()
  }

  const onEndReached = () => {
    onPressSkip()
  }

  return (
    <View style={styles.Guide}>
      <MyCarousel
        data={data}
        childrenComponent={childrenComponent}
        itemWidth={width}
        itemHeight={height}
        spacing={0}
        initialScrollIndex={0}
        borderRadius={0}
        currentCallback={currentCallback}
        onRef={onRef}
        ListFooterComponent={<View style={{ width: width / 3, backgroundColor: '#450979', height: '100%' }} />}
        onEndReachedThreshold={1 / 13}
        onEndReached={onEndReached}
      />

      <View style={styles.FooterView}>
        {
          current === 0 ?
            <View style={{ width: 40 }} /> :
            <IconButton
              onPress={onPressPre}
              icon={<Icon as={<FeatherIcon name='arrow-left' />} />}
              borderRadius="full"
              _icon={{ color: "primary.100" }}
            />
        }
        <View style={styles.FooterViewCenter}>
          {
            data.map((_item, index) =>
              <View
                key={index}
                style={[
                  styles.FooterViewCenterItem,
                  { backgroundColor: index <= current ? '#4F009E' : '#E8ECF0', width: index === current ? 15 : 6, }
                ]}
              />
            )
          }
        </View>
        {
          current === 3 ?
            <View style={{ width: 40 }} /> :
            <Button size='sm' variant="ghost" _text={{ color: "primary.100" }} onPress={onPressSkip}>Skip</Button>
        }
      </View>
    </View>
  )
}

export default Guide;