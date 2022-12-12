import * as React from 'react';
import PushNotification from 'react-native-push-notification';
import images from 'src/assets/images';
import { View, StyleSheet, Image, Dimensions, PanResponder, Animated, } from 'react-native';
import { CommonActions, createNavigatorFactory, ParamListBase, TabActionHelpers, TabNavigationState, TabRouter, TabRouterOptions, useNavigationBuilder } from '@react-navigation/native';
import { Props, TabNavigationEventMap, TabNavigationOptions } from './type';
import { useAppSelector } from 'src/store/hooks';
import { Pressable, Text } from 'native-base';
import { selectFriends } from 'src/store/friends/friendsSlice';
import { selectApply } from 'src/store/apply/applySlice';

const { width } = Dimensions.get('screen')
export const start = (width - 48) / 5 + 42
const end = (width - 48) / 5 * 2 + 50

function TabNavigator({ initialRouteName, children, screenOptions, tabBarStyle, contentStyle, tabBarButtonStyle }: Props) {
  const { state, navigation, descriptors, NavigationContent } = useNavigationBuilder<
    TabNavigationState<ParamListBase>,
    TabRouterOptions,
    TabActionHelpers<ParamListBase>,
    TabNavigationOptions,
    TabNavigationEventMap
  >(TabRouter, {
    children,
    screenOptions,
    initialRouteName,
  });
  const heightAnim = React.useRef(new Animated.Value(start)).current
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const friendsList = useAppSelector(selectFriends);
  const applys = useAppSelector(selectApply);
  const [num, setNum] = React.useState<number>(0)

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: (evt, gs) => {
      if (gs.dy > 8) {
        Animated.timing(heightAnim, {
          toValue: start,
          duration: 300,
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished)
            setIsOpen(false)
        });
      } else if (gs.dy < -8) {
        Animated.timing(heightAnim, {
          toValue: end,
          duration: 300,
          useNativeDriver: false
        }).start(({ finished }) => {
          if (finished)
            setIsOpen(true)
        });
      }
    }
  })

  React.useEffect(() => {
    let i = 0
    for (const item of friendsList.data) {
      i += item.unread
    }
    for (const item of applys.data) {
      if (item.state === 0) {
        i++
      }
    }
    PushNotification.setApplicationIconBadgeNumber(i)
    setNum(i)
  }, [friendsList, applys])

  return (
    <NavigationContent>
      <View style={styles.body}>
        {
          state.routes.map((route, i) => {
            if (i === state.index)
              return (
                <View key={route.key} style={StyleSheet.absoluteFill} >
                  {descriptors[route.key].render()}
                </View>
              );
          })
        }
      </View>

      <Animated.View style={[styles.footerView, { height: heightAnim }]}>
        <View style={styles.panView} {..._panResponder.panHandlers}>
          <View style={styles.Line} />
        </View>
        {
          state.routes.map((route, i) => {
            return (
              <Pressable
                key={route.key}
                style={[styles.imgbox, { borderWidth: isOpen ? 1 : 0 }]}
                android_ripple={{ color: 'rgba(119, 29, 209, 0.1)' }}
                onPress={() => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                    data: {
                      isAlreadyFocused: route.key === state.routes[state.index].key,
                    },
                  });
                  if (!event.defaultPrevented) {
                    navigation.dispatch({
                      ...CommonActions.navigate({ name: route.name, merge: true }),
                      target: state.key,
                    });
                  }
                  if (isOpen) {
                    Animated.timing(heightAnim, {
                      toValue: start,
                      duration: 300,
                      useNativeDriver: false
                    }).start(({ finished }) => {
                      if (finished)
                        setIsOpen(false)
                    });
                  }
                }}
              >
                <Image style={styles.img} source={i === state.index ? descriptors[route.key].options.activeIcon : descriptors[route.key].options.icon} />
                {
                  num && i === 2 ?
                    <Text style={styles.msgNum}>{num > 99 ? '99+' : num}</Text> :
                    null
                }
              </Pressable>
            )
          })
        }

        <Pressable
          style={[styles.imgbox, { borderWidth: isOpen ? 1 : 0 }]}
          android_ripple={{ color: 'rgba(119, 29, 209, 0.1)' }}
          onPress={() => {
            navigation.navigate('Setting')
            if (isOpen) {
              Animated.timing(heightAnim, {
                toValue: start,
                duration: 300,
                useNativeDriver: false
              }).start(({ finished }) => {
                if (finished)
                  setIsOpen(false)
              });
            }
          }}
        >
          <Image style={styles.img} source={images.Setting} />
        </Pressable>
        <Pressable
          style={[styles.imgbox, { borderWidth: isOpen ? 1 : 0 }]}
          android_ripple={{ color: 'rgba(119, 29, 209, 0.1)' }}
          onPress={() => {
            navigation.navigate('Feedback')
            if (isOpen) {
              Animated.timing(heightAnim, {
                toValue: start,
                duration: 300,
                useNativeDriver: false
              }).start(({ finished }) => {
                if (finished)
                  setIsOpen(false)
              });
            }
          }}
        >
          <Image style={styles.img} source={images.feedback} />
        </Pressable>
      </Animated.View>
    </NavigationContent>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    position: 'relative'
  },
  footerView: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 45,
    borderTopRightRadius: 45,
    overflow: 'hidden',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    elevation: 10,
    zIndex: 9999
  },
  panView: {
    height: 26,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgbox: {
    width: (width - 48) / 5,
    height: (width - 48) / 5,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 8,
    position: 'relative',
    borderColor: '#B1B1B1'
  },
  msgNum: {
    position: 'absolute',
    backgroundColor: 'red',
    color: '#fff',
    fontSize: 8,
    paddingHorizontal: 6,
    lineHeight: 14,
    textAlign: 'center',
    borderRadius: 7,
    top: 9,
    right: 9
  },
  img: {
    width: 28,
    height: 28,
  },
  Line: {
    height: 4,
    backgroundColor: '#DEDEDE',
    width: width / 4,
    borderRadius: 2,
  },
  Line1: {
    height: 6,
    borderRadius: 3
  }
})

export default createNavigatorFactory<TabNavigationState<ParamListBase>, TabNavigationOptions, TabNavigationEventMap, typeof TabNavigator>(TabNavigator);