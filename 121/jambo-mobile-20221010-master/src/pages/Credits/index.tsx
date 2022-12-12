import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import FeatherIcon from 'react-native-vector-icons/Feather';
import Title from "components/Title";
import LinearGradient from "react-native-linear-gradient";
import Lottie from 'lottie-react-native';
import { Icon, IconButton, Image, View } from "native-base";
import { Dimensions, ImageBackground } from "react-native";
import { user_reputation } from "src/store/api";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectMyInfo } from "src/store/myInfo/myInfoSlice";
import { useFocusEffect } from "@react-navigation/native";
import { setTime3 } from "src/store/time3/time3Slice";

const { width } = Dimensions.get('screen')

function Credits(props: IProps) {
  const [level, setLevel] = React.useState<number>(0)
  const myInfo = useAppSelector(selectMyInfo);
  let timer: NodeJS.Timer
  const dispatch = useAppDispatch();
  const animationRef = React.useRef<Lottie>(null)

  useFocusEffect(
    React.useCallback(() => {
      let time = 0
      timer = setInterval(() => {
        time++
        dispatch(setTime3(time))
      }, 1000)
      return () => {
        clearInterval(timer)
      };
    }, []),
  );

  React.useEffect(() => {
    getData()
  }, [])

  const getData = () => {
    user_reputation().then(res => {
      const num = Number(res.data.reputation || 0)
      setLevel(num)
      num && animationRef.current?.play(0, num - 1)
    })
  }

  return (
    <ImageBackground source={images.background1} style={styles.Credits}>
      <View style={styles.header}>
        <Image source={images.logo1} style={styles.img1} />

        <IconButton
          icon={<Icon as={<FeatherIcon name='bell' />} />}
          borderRadius="full"
          _icon={{
            color: "#FFD27B",
            size: 'lg'
          }}
          onPress={() => props.navigation.navigate('Notifications')}
        />
      </View>

      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
        style={styles.content}
      >
        <Title title='Welcome back' style={styles.title1} />
        <Title title={myInfo.username} style={styles.title2} />
        <View style={{ height: width - 72, width: width - 72, position: 'relative' }}>
          <Lottie speed={4} ref={animationRef} source={require('../../assets/chart.json')} autoPlay={false} loop={false} style={{ flex: 1 }} resizeMode='cover' />
          <Title
            style={{
              fontSize: 38,
              color: '#461A86',
              fontWeight: 'bold',
              position: 'absolute',
              top: (width - 72) / 2,
              left: (width - 72) / 2 - 51,
              width: 102
            }}
            title={`${level || '--'}%`}
          />
        </View>
        <Title title='Score' style={styles.title3} />
        <Title style={{
          color:
            level <= 0 ?
              '#4B4B4B' :
              level <= 49 ?
                '#FE1111' :
                level <= 69 ?
                  '#FF6F06' :
                  level <= 89 ?
                    '#FFA800' :
                    level <= 100 ?
                      '#FFD600' : '#4B4B4B',
          fontSize: 18
        }} title={
          level <= 0 ?
            'Undecided' :
            level <= 49 ?
              'Poor' :
              level <= 69 ?
                'Good' :
                level <= 89 ?
                  'Excellent' :
                  level <= 100 ?
                    'PerFect' : ''
        } />
      </LinearGradient>
    </ImageBackground>
  )
}

export default Credits;