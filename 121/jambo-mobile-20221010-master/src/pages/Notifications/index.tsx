import React, { useEffect, useState } from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import { ActivityIndicator, ImageBackground, RefreshControl } from "react-native";
import { delete_notification, notification_message } from "src/store/api";
import { Pressable, Text, useToast, View } from "native-base";
import { SwipeListView } from "react-native-swipe-list-view";

interface INotification {
  content: string
  id: string
  param: string
  title: string
  uid: string
  url: string
}

function Notifications(props: IProps) {
  const [page, setPage] = useState<number>(1)
  const [data, setData] = useState<INotification[]>([])
  const [total, setTotal] = useState<number>(0)
  const [i, setI] = useState<number>(0)
  const toast = useToast()

  useEffect(() => {
    getNotificationMessage()
  }, [page, setPage, i, setI])

  const getNotificationMessage = () => {
    notification_message({ page }).then(res => {
      const arr = Array.isArray(res.data.result) ? res.data.result : []
      setData(d => [...d, ...arr])
      setTotal(res.data.total)
    })
  }

  const childrenComponent = ({ item }: { item: INotification }) => {
    return (
      <View>
        <Pressable style={styles.NotificationItem} onPress={() => onClickArticle(item)}>
          <Text style={styles.NotificationItemText}>{item.content}</Text>
        </Pressable>
        <View style={{ height: 18 }} />
      </View>
    )
  }

  const onClickArticle = (item: any) => {
    // 1.系统消息（不可点击）
    switch (item.url) {
      case '2':
        // 2.上课提醒（点击跳转上课）
        props.navigation.navigate('Academy')
        break
      case '3':
        // 3.考试成绩通知（第十周全部答完题反馈-点击跳转成绩页）
        props.navigation.navigate('Academy')
        break
      case '4':
        // 4.身份证验证（身份证审核错误时通知-点击跳转上传页）
        props.navigation.navigate('Academy')
        break
    }
  }

  const onEndReached = () => {
    if (data.length !== total) {
      setPage(n => n + 1)
    }
  }

  const onRefresh = () => {
    setPage(1)
    setTotal(0)
    setData([])
    setI(i => i + 1)
  }

  const renderHiddenItem = ({ item }: { item: any }) => {
    return (
      <View style={{ height: '100%' }}>
        <View style={styles.NotificationItemDeleteView}>
          <Pressable style={{ width: 92, height: '100%', alignItems: 'center', justifyContent: 'center' }} onPress={() => {
            delete_notification(item.id).then(res => {
              onRefresh()
              toast.show({ description: res.msg })
            })
          }}>
            <Text style={{ color: '#fff' }}>Delete</Text>
          </Pressable>
        </View>
        <View style={{ height: 18 }} />
      </View>
    )
  }

  return (
    <ImageBackground source={images.background1} style={styles.Notifications}>
      <Header title='Notifications' titleStyle={styles.titleStyle} />

      <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
        <SwipeListView
          data={data}
          renderItem={childrenComponent}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={88}
          onEndReached={onEndReached}
          // ListEmptyComponent={<Text style={{ textAlign: "center" }}>There is no data</Text>}
          ListFooterComponent={
            data.length === total ?
              <Text style={styles.tipText}></Text> : /**You have no notifications, get started at JamboAcademy!   I also have a bottom line. */
              <ActivityIndicator style={styles.ActivityIndicator} />
          }
          refreshControl={<RefreshControl refreshing={false} onRefresh={onRefresh} />}
        />
      </ImageBackground>
    </ImageBackground>
  )
}

export default Notifications;