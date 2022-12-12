import React from 'react';
import styles from './style';
import { ActivityIndicator, Dimensions, RefreshControl, View, ViewStyle } from 'react-native';
import { FlatList as FlatList2 } from 'react-native-gesture-handler'
import { Text } from 'native-base';

interface IFlatListVertical {
  data: any[]
  childrenComponent: (item: any, index: number) => React.ReactNode
  total?: number
  spacing?: number
  numColumns?: number
  onEndReached?: () => void
  onRefresh?: () => void
  itemHeight?: number
  ListHeaderComponent?: React.ComponentType<any> | React.ReactElement
  paddingBottom?: number
  scrollEnabled?: boolean
  onRef?: (self: any) => void
}

const { width } = Dimensions.get('screen')
// 垂直列表
export default function FlatListVertical(props: IFlatListVertical) {
  let refFlatList: FlatList2 | null = null

  const itemWidth = props.numColumns && props.numColumns > 1 ? (
    (width - (props.spacing !== undefined ? props.spacing * (props.numColumns + 1) : 14 * (props.numColumns + 1))) / props.numColumns
  ) : width - (props.spacing !== undefined ? props.spacing * 2 : 28);

  const itemBoxStyle: ViewStyle = {
    margin: props.spacing !== undefined ? props.spacing / 2 : 7,
    width: itemWidth,
    height: props.itemHeight ? props.itemHeight : 'auto'
    // (props.numColumns && props.numColumns > 1 ? itemWidth : itemWidth * 0.65)
  };

  const onEndReached = () => {
    if (props.total && props.data.length < props.total && props.onEndReached) {
      props.onEndReached()
    }
  }

  React.useImperativeHandle(props.onRef, () => {
    return {
      scrollToEnd: scrollToEnd,
      scrollToIndex: scrollToIndex,
    };
  });

  const scrollToEnd = () => {
    refFlatList?.scrollToEnd()
  }

  const scrollToIndex = (index?: number) => {
    refFlatList?.scrollToIndex({ index: index ? index : 0 })
  }

  return (
    <FlatList2
      ref={(ref: FlatList2) => refFlatList = ref}
      removeClippedSubviews
      style={{ paddingHorizontal: props.spacing !== undefined ? props.spacing / 2 : 7 }}
      data={props.data}
      numColumns={props.numColumns}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={false}
      scrollEnabled={props.scrollEnabled}
      renderItem={({ item, index }) => {
        return (
          <View style={[styles.LiveRoomItemBox, itemBoxStyle]}>
            {props.childrenComponent(item, index)}
          </View>
        )
      }}
      onEndReached={onEndReached}
      // ListEmptyComponent={
      //   <View style={[styles.emptyView, { width: props.spacing !== undefined ? width - props.spacing : width - 14 }]}>
      //     <Text style={styles.tipText}>There is no data</Text>
      //   </View>
      // }
      ListFooterComponent={
        props.total ? (
          props.data.length === props.total ?
            <Text style={[styles.tipText, { marginBottom: props.paddingBottom }]}>You’ve reached the bottom</Text> :/* No More     I also have a bottom line.*/
            <ActivityIndicator style={[styles.ActivityIndicator, { marginBottom: props.paddingBottom }]} />
        ) : (
          props.paddingBottom ?
            <View style={{ height: props.paddingBottom }} /> :
            null
        )
      }
      ListHeaderComponent={props.ListHeaderComponent}
      refreshControl={props.onRefresh ? <RefreshControl refreshing={false} onRefresh={props.onRefresh} /> : undefined}
    />
  );
};