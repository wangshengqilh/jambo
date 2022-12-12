import React from 'react';
import Routers from 'src/router';
import SplashScreen from 'react-native-splash-screen'
import Orientation from 'react-native-orientation';
import storage from 'src/store/storage';
import Video from 'react-native-video';
import FeatherIcon from 'react-native-vector-icons/Feather';
import images from 'src/assets/images';
import Title from 'components/Title';
import Lottie from 'lottie-react-native';
import { Animated, AppState, Dimensions, LogBox, Platform, StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Heading, HStack, Icon, IconButton, Image, Pressable, Spinner, Text, useToast, View } from 'native-base';
import { skey } from 'src/assets/static';
import { Urls } from 'src/router/type';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setSkey } from 'store/skey/skeySlice';
import { selectToast, setToast } from 'src/store/toast/toastSlice';
import { customNavigation } from 'src/router/customNavigation';
import { getMyInfoAsync } from 'src/store/myInfo/myInfoSlice';
import { selectMask } from 'src/store/mask/maskSlice';
import { setOpen } from 'src/store/open/openSlice';
import { selectCelebrate, setCelebrate } from 'src/store/celebrate/celebrateSlice';
import { user_usetime } from 'src/store/api';
import { store } from 'src/store';
import { setAd } from 'src/store/ad/adSlice';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('screen')

const App = () => {
  const [initialRouteName, setInitialRouteName] = React.useState<Urls>();
  const dispatch = useAppDispatch();
  const toast = useToast()
  const msg = useAppSelector(selectToast);
  const mask = useAppSelector(selectMask);
  const score = useAppSelector(selectCelebrate);
  const [s, setS] = React.useState<number>(8)
  const [muted, setMuted] = React.useState<boolean>(true)
  const animationRef = React.useRef<Lottie>(null)
  const bottomAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    SplashScreen.hide();
    storage.load({ key: skey }).then(ret => {
      dispatch(setSkey(ret))
      dispatch(getMyInfoAsync()).then(() => {
        setInitialRouteName('Home')
      })
    }).catch(() => {
      setInitialRouteName('Guide')
    })
    const timer = setInterval(() => {
      setS(i => {
        if (i <= 0) {
          clearInterval(timer)
        }
        return i - 1
      })
    }, 1000);
    let use_time1 = 0
    let tiemr1: NodeJS.Timer
    AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        dispatch(setOpen(true))
        use_time1 = 0
        tiemr1 = setInterval(() => {
          use_time1++
        }, 1000)
      } else {
        if (use_time1 !== 0) {
          user_usetime({ use_time1, use_time2: store.getState().time2.value, use_time3: store.getState().time3.value })
        }
        dispatch(setOpen(false))
        clearInterval(tiemr1)
      }
    })
  }, [])

  React.useEffect(() => {
    if (score) {
      animationRef.current?.play()
      Animated.timing(bottomAnim, {
        toValue: height / 2,
        duration: 300,
        useNativeDriver: false
      }).start();
      const timer = setTimeout(() => {
        dispatch(setCelebrate(0))
        clearTimeout(timer)
      }, 3220);
    } else {
      Animated.timing(bottomAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false
      }).start();
      animationRef.current?.reset()
    }
  }, [score])

  React.useEffect(() => {
    if (msg) {
      dispatch(setToast(''))
      toast.show({ description: msg })
    }
  }, [msg])

  React.useEffect(() => {
    if (initialRouteName) {
      Orientation.lockToPortrait();
    }
  }, [initialRouteName, setInitialRouteName])

  React.useEffect(() => {
    if (s <= -1) {
      dispatch(setAd(true))
    }
  }, [s, setS])

  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar barStyle='light-content' translucent={Platform.OS === 'android'} backgroundColor="transparent" />
      {
        initialRouteName ?
          <NavigationContainer ref={customNavigation}>
            <Routers initialRouteName={initialRouteName} />
          </NavigationContainer> :
          null
      }

      {
        mask ?
          <HStack space={2} justifyContent="center" style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.2)', flexDirection: 'row', alignItems: 'center' }]}>
            <Spinner accessibilityLabel="Loading posts" color='#EFF2F4' />
            <Heading color="#EFF2F4" fontSize="md" style={{ lineHeight: 24 }}>{mask}</Heading>
          </HStack> :
          null
      }

      {
        s <= -1 && initialRouteName ?
          null :
          <View style={[StyleSheet.absoluteFill, { zIndex: 9999 }]}>
            <Video muted={muted} resizeMode='cover' style={styles.video} source={require('./src/assets/guide.mp4')} />
            <IconButton
              icon={<Icon as={<FeatherIcon name={muted ? 'volume-x' : 'volume-2'} />} />}
              borderRadius="full"
              _icon={{
                color: "primary.50",
              }}
              onPress={() => setMuted(b => !b)}
              style={styles.volume}
            />
            {
              initialRouteName ?
                <Button style={styles.skip} variant='ghost' onPress={() => setS(-1)}>
                  <Text color="primary.50">Skip({s}s)</Text>
                </Button> :
                null
            }
          </View>
      }

      {
        score ?
          <Pressable style={[StyleSheet.absoluteFill, styles.congratulations]} onPress={() => dispatch(setCelebrate(0))}>
            <Lottie ref={animationRef} source={require('./src/assets/data.json')} style={[StyleSheet.absoluteFill, { zIndex: 999 }]} autoPlay />
            <Animated.View style={[styles.box11, { bottom: bottomAnim }]}>
              <Image source={images.diamond} style={styles.img4} />
              <Title title={score} style={styles.text7} />
            </Animated.View>
          </Pressable> :
          null
      }
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  video: {
    flex: 1,
  },
  volume: {
    position: 'absolute',
    top: 32,
    left: 18
  },
  skip: {
    position: 'absolute',
    top: 32,
    right: 18
  },
  congratulations: {
    zIndex: 9999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img4: {
    width: 68,
    height: 68
  },
  text7: {
    fontSize: 48,
    color: '#fff'
  },
  box11: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(69, 9, 121, 0.8)',
    borderRadius: 36,
    width: width / 2,
    left: width / 4
  },
})

export default App;