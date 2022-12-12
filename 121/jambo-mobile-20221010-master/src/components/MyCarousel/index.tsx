import React from 'react';
import styles from './style';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Dimensions, Pressable, View, ViewStyle, ViewToken } from 'react-native';
import { FlatList as FlatList2 } from 'react-native-gesture-handler';

interface IMyCarousel {
  data: any[]
  childrenComponent: (item: any, index: number) => React.ReactNode
  itemWidth?: number
  itemHeight?: number
  initialScrollIndex?: number
  spacing?: number
  currentCallback?: (current: number) => void
  upButton?: () => void                         // 向上加载更多
  downButton?: () => void                       // 向下加载更多
  moreBackgroundColor?: string
  onRef?: (self: any) => void
  borderRadius?: number
  scrollEnabled?: boolean
  width?: number | string
  ListFooterComponent?: React.ComponentType<any> | React.ReactElement | null | undefined
  onEndReachedThreshold?: number | null | undefined
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined
}

const { width } = Dimensions.get('screen')
// 旋转木马
const MyCarousel = (props: IMyCarousel) => {
  if (props.data.length) {
    const m = (props.spacing !== undefined ? props.spacing / 2 : 7) * 2
    const itemBoxStyle: ViewStyle = {
      width: props.itemWidth || width * 0.7 - m,
      height: props.itemHeight || 'auto',
      marginHorizontal: props.spacing !== undefined ? props.spacing / 2 : 7,
      borderRadius: props.borderRadius !== undefined ? props.borderRadius : 9
    }
    const moreBoxStyle = {
      width: props.itemWidth ?
        (width - props.itemWidth) / 2 - (props.spacing !== undefined ? props.spacing / 2 : 7) :
        width * 0.15 - (props.spacing !== undefined ? props.spacing / 2 : 7),
      backgroundColor: props.moreBackgroundColor || 'rgba(0,0,0,0.1)',
    }
    const [current, setCurrent] = React.useState<number>(props.initialScrollIndex === undefined ? parseInt(`${props.data.length / 2}`) : props.initialScrollIndex)
    let refFlatList: FlatList2 | null = null

    React.useEffect(() => {
      props.currentCallback && props.currentCallback(current)
    }, [current, setCurrent])

    React.useImperativeHandle(props.onRef, () => {
      return {
        onPressNext: onPressNext,
        onPressPre: onPressPre,
        openPage: openPage
      };
    });

    const onViewableItemsChanged = React.useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length === 1) {
        setCurrent(viewableItems[0].index || 0)
      }
    }, []);

    const onPressPre = () => {
      if (0 < current) {
        const preCurrent = current - 1
        refFlatList?.scrollToOffset({ offset: props.itemWidth ? props.itemWidth * preCurrent : width * 0.7 * preCurrent })
        setCurrent(preCurrent)
      }
    }

    const onPressNext = () => {
      const total = props.data.length
      if (current < total - 1) {
        const nextCurrent = current + 1
        refFlatList?.scrollToOffset({ offset: props.itemWidth ? props.itemWidth * nextCurrent : width * 0.7 * nextCurrent })
        setCurrent(nextCurrent)
      }
    }

    const openPage = (index: number) => {
      refFlatList?.scrollToOffset({ offset: props.itemWidth ? props.itemWidth * index : width * 0.7 * index })
      setCurrent(index)
    }

    return (
      <View style={styles.MyCarousel}>
        {
          props.upButton ?
            <Pressable
              style={[styles.moreBanner1, moreBoxStyle]}
              android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
              onPress={props.upButton}
            >
              <FeatherIcon name='more-horizontal' size={24} color="#fff" />
            </Pressable> :
            null
        }

        <FlatList2
          horizontal
          style={[styles.flatList, { width: props.width ? props.width : (props.itemWidth ? props.itemWidth : width * 0.7) }]}
          data={props.data}
          keyExtractor={(item, index) => index.toString()}
          ref={(ref: FlatList2) => refFlatList = ref}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={props.scrollEnabled}
          renderItem={({ item, index }) => {
            return (
              <View style={[styles.LiveRoomItemBox, itemBoxStyle]}>
                {props.childrenComponent(item, index)}
              </View>
            )
          }}
          removeClippedSubviews={true}
          initialNumToRender={3}
          initialScrollIndex={props.initialScrollIndex === undefined ? parseInt(`${props.data.length / 2}`) : props.initialScrollIndex}
          pagingEnabled={true}
          getItemLayout={(item, index) => {
            if (props.itemWidth) {
              return { length: props.itemWidth, offset: (props.itemWidth) * index, index }
            }
            return { length: width * 0.7, offset: width * 0.7 * index, index };
          }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 80
          }}
          ListFooterComponent={props.ListFooterComponent}
          onEndReachedThreshold={props.onEndReachedThreshold}
          onEndReached={props.onEndReached}
        />

        {
          props.downButton ?
            <Pressable
              onPress={props.downButton}
              style={[styles.moreBanner2, moreBoxStyle]}
              android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
            >
              <FeatherIcon name='more-horizontal' size={24} color="#fff" />
            </Pressable> :
            null
        }
      </View>
    );
  }
  return null
};

export default MyCarousel;