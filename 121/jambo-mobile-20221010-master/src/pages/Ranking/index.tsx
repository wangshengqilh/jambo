import React from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Header from "components/Header";
import LinearGradient from "react-native-linear-gradient";
import FlatListVertical from "components/FlatListVertical";
import Title from "components/Title";
import { ImageBackground } from "react-native";
import { respondent_list, score_ranking } from "src/store/api";
import { Avatar, Pressable, Text, View } from "native-base";

interface IRanking {
  acc_state: string
  accesscount: string
  avatar: string
  birthday: string
  city: string
  class_remarks: string
  code: string
  country_id: string
  country_name: string
  createdate: string
  email: string
  fristname: string
  idcard: string
  idcard_state: string
  intro: string
  is_code: string
  is_online: string
  is_reward: string
  lastname: string
  modifydate: string
  passwd: string
  phone: string
  phonecode: string
  remarks: string
  reputation: string
  saler: string
  scores: string
  score: string
  state: string
  subjectno: string
  uid: string
  username: string
}
/**
 * 排行榜
 * @param props sid    sid存在则是某套具体卷子的得分排行，不存在则是总排行榜
 * @returns 
 */
function Ranking(props: IProps) {
  const [data, setData] = React.useState<IRanking[]>([])
  const [total, setTotal] = React.useState<number>(0)
  const [page, setPage] = React.useState<number>(1)
  const [loading, setLoading] = React.useState<boolean>(false)
  const sid = props.route.params?.sid

  React.useEffect(() => {
    getData()
  }, [page, setPage])

  const getData = () => {
    if (sid) {
      get_respondent_list()
    } else {
      get_score_ranking()
    }
  }

  const get_score_ranking = () => {
    score_ranking({ page }).then(res => {
      const arr = Array.isArray(res.data.result) ? res.data.result : []
      setTotal(res.data.total)
      setData(d => [...d, ...arr])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const get_respondent_list = () => {
    respondent_list({ page, sid }).then(res => {
      const arr = Array.isArray(res.data.result) ? res.data.result : []
      setTotal(res.data.total)
      setData(d => [...d, ...arr])
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  const onEndReached = () => {
    if (!loading) {
      setLoading(true)
      setPage(n => n + 1)
    }
  }

  const onRefresh = () => {
    if (page === 1) {
      setData([])
      setTotal(0)
      getData()
    } else {
      setData([])
      setTotal(0)
      setPage(1)
    }
  }

  const childrenComponent = (item: IRanking) => {
    return (
      <Pressable style={styles.item} onPress={() => props.navigation.navigate('UserInfo', { friend_id: item.uid.toString() })}>
        <View style={styles.left}>
          <Avatar source={{ uri: item.avatar }}>{item.username}</Avatar>
          <View style={styles.nameView}>
            <Title style={styles.title1} title={item.username} numberOfLines={1} />
            <Text style={styles.location}>{item.country_name}</Text>
          </View>
        </View>
        <Title title={item.scores || item.score} style={styles.title1} />
      </Pressable>
    )
  }

  return (
    <ImageBackground source={images.background1} style={styles.Ranking}>
      <Header title={sid ? '' : 'Leaderboard'} titleStyle={styles.title2} />
      <LinearGradient
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
        style={styles.Box}
      >
        <FlatListVertical
          data={data}
          childrenComponent={childrenComponent}
          total={total}
          spacing={0}
          onEndReached={onEndReached}
          onRefresh={onRefresh}
        />
      </LinearGradient>
    </ImageBackground>
  )
}

export default Ranking;