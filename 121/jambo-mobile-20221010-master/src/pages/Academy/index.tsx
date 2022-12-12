import React, { useEffect, useState } from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import styles from "./style";
import Title from "components/Title";
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from "react-native-linear-gradient";
import { Avatar, Button, FormControl, Icon, IconButton, Input, Text, View, WarningOutlineIcon, Pressable } from "native-base";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectMyInfo, setMyInfo } from "src/store/myInfo/myInfoSlice";
import { ImageBackground, Linking, ScrollView } from "react-native";
import { info, modify_idcard, testPaper } from "src/store/api";
import { selectFriends } from "src/store/friends/friendsSlice";
import { TimeDifference1 } from "src/tool/timeDiffer";

interface IPaper {
  ans_num: string
  createdate: string
  id: string
  intro: string
  question_num: string
  rank: string
  state: string
  subject_state: 0 | 1 | 2 | 3 // 0 正在答题 1 答题完未超过24小时 2 答题完超过 3 未答题
  title: string
  url: string
  v_read: string
  theme: string
  endtime: number
  score: number
  user: {
    avatar: string,
    uid: string,
    username: string,
  }[]
}

function Academy(props: IProps) {
  const myInfo = useAppSelector(selectMyInfo);
  const dispatch = useAppDispatch();
  const [params, setParams] = useState<{ idcard: string, code: string }>({ idcard: '', code: '' })
  const [isCheck, setIsCheck] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [num, setNum] = useState<number>(0)
  const [paper, setPaper] = useState<IPaper[]>([])
  const [nowPaper, setNowPaper] = useState<IPaper>()
  const [nowPaperRank, setNowPaperRank] = useState<string>('')
  const friendList = useAppSelector(selectFriends)
  const [fNum, setFnum] = useState<number>(0)

  useEffect(() => {
    if (myInfo.uid) {
      if (myInfo.idcard_state !== '1' && num === 0) {
        setNum(1)
        getUserInfo()
      }
      if (myInfo.idcard_state === '1' || myInfo.idcard_state === '3') {
        getTestPaper()
      }
    }
  }, [myInfo])

  useEffect(() => {
    let i = 0
    for (const item of friendList.data) {
      if (item.type === 0) {
        i++
      }
    }
    setFnum(i)
  }, [friendList])

  const getTestPaper = () => {
    testPaper().then(res => {
      const arr = Array.isArray(res.data.testPaperArr) ? res.data.testPaperArr : []
      for (const item of arr) {
        if (item.id === res.data.sid) {
          setNowPaper(item)
          setNowPaperRank(item.rank)
          break
        }
      }
      setPaper(arr)
    })
  }

  const getUserInfo = () => {
    info().then(res => {
      dispatch(setMyInfo(res.data))
    })
  }

  const onChangeTextCode = (text: string) => {
    setParams(p => ({ ...p, code: text }))
  }

  const onPressVerify = () => {
    setIsCheck(true)
    setIsLoading(true)
    if (params.code) {
      modify_idcard(params).then(res => {
        getUserInfo()
        setIsLoading(false)
      }).catch(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }

  const onPressOkay = () => {
    if (myInfo.uid) {
      dispatch(setMyInfo({ ...myInfo, idcard_state: '0' }))
    }
  }

  const onPressStart = () => {
    if (nowPaper?.subject_state === 2) {
      props.navigation.navigate('Classroom', { sid: nowPaper.id })
    } else {
      props.navigation.navigate('Classroom', { isAfter: true, sid: nowPaper?.id })
    }
  }

  const onPressRankingSid = () => {
    props.navigation.navigate('Ranking', { sid: nowPaper?.id, rank: nowPaper?.rank })
  }

  const onPressRanking = () => {
    props.navigation.navigate('Ranking')
  }

  const onPressHereLink = () => {
    const JamboAcademyURL = 'https://jambotechnology.typeform.com/JamboAcademy'
    Linking.canOpenURL(JamboAcademyURL).then(supported => {
      if (!supported) {
        props.navigation.navigate('Web', { uri: JamboAcademyURL })
      } else {
        Linking.openURL(JamboAcademyURL).catch(() => {
          props.navigation.navigate('Web', { uri: JamboAcademyURL })
        })
      }
    }).catch(err => {
      props.navigation.navigate('Web', { uri: JamboAcademyURL })
    });
  }

  if (myInfo.idcard_state === '0') {
    // 未上身份证
    return (
      <ImageBackground source={images.background1} style={styles.Academy}>
        <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <Title title={`Welcome ${myInfo.username}!`} style={styles.title} />
              <Text style={styles.text1}>Please enter your invitation code below to enter the academy</Text>
              <Text style={styles.text1}>No invitation code yet? Please <Text style={styles.text1_1} onPress={onPressHereLink}>fill in this form</Text> to request a code or contact your local JamboAmbassador.</Text>
              <FormControl isInvalid={isCheck ? !params.code : false} style={styles.FormControl}>
                <Input placeholder="Please enter the invitation code" value={params.code} onChangeText={onChangeTextCode} />
                <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                  Please enter your invitation code!
                </FormControl.ErrorMessage>
              </FormControl>
              <Button style={styles.FormControl} isLoading={isLoading} onPress={onPressVerify}>Verify</Button>
            </View>

            <View style={styles.bottomView} />
          </ScrollView>
        </ImageBackground>
      </ImageBackground>
    )
  } else if (myInfo.idcard_state === '2') {
    // 未通过
    return (
      <ImageBackground source={images.background1} style={styles.Academy}>
        <ImageBackground source={images.background2} style={styles.box} resizeMode='stretch'>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Title title='Sorry!' style={styles.title1} />
            <Text style={styles.text11}>The identity authentication failed. Please upload the identity information again.</Text>
            <Button style={styles.FormControl} onPress={onPressOkay}>Okay</Button>
            <View style={styles.bottomView} />
          </ScrollView>
        </ImageBackground>
      </ImageBackground>
    )
  } else {
    // 通过  身份证审核中
    return (
      <ImageBackground source={images.background1} style={styles.Academy1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.box1}>
            <IconButton icon={<Icon as={<FeatherIcon name="bell" />} />} borderRadius="full" _icon={{ color: "#FFB422" }} onPress={() => props.navigation.navigate('Notifications')} />
          </View>

          <View style={styles.box2}>
            <Title style={styles.title2} title='Welcome back' />
            <Title style={styles.title3} title={myInfo.username} />
            <View style={styles.box2_1}>
              <Text style={styles.text3}>Week {nowPaper?.rank}</Text>
              <Text style={styles.text3} onPress={() => props.navigation.navigate('Message')}>{fNum} Friends</Text>
              <Text style={styles.text3} onPress={onPressRanking}>Leaderboard</Text>
            </View>
          </View>

          <View style={styles.box3}>
            <LinearGradient
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
              style={styles.box3_1}
            >
              <Pressable style={styles.box3_1_1} onPress={onPressStart}>
                <Title title={nowPaper?.theme} style={styles.box3_1_1_title} />
                <Icon as={<FeatherIcon name="chevron-right" />} size={18} />
              </Pressable>
              <View style={styles.box3_1_2}>
                <Text style={styles.box3_1_2_text}>Lesson {nowPaper?.rank}: {nowPaper?.title}</Text>
                <Text style={styles.box3_1_2_text}>{nowPaper?.intro}</Text>
                {
                  nowPaper?.user ?
                    <View style={{ flexDirection: 'row-reverse' }}>
                      <Pressable onPress={onPressRankingSid}>
                        <Avatar.Group _avatar={{ size: 'sm' }} max={4}>
                          {
                            nowPaper.user.map((item, index) =>
                              <Avatar key={index} source={{ uri: item.avatar }}>{item.username}</Avatar>
                            )
                          }
                        </Avatar.Group>
                      </Pressable>
                    </View> :
                    null
                }
                <Button style={styles.startLesson} onPress={onPressStart}>
                  {
                    nowPaper?.subject_state === 3 ?
                      'Start lesson' :
                      nowPaper?.subject_state === 1 ?
                        'Retake the quiz' :
                        nowPaper?.subject_state === 0 ?
                          'Continue to study' :
                          'Review class content'
                  }
                </Button>
              </View>
              <Title title={`WEEK ${nowPaper?.rank}`} style={styles.box3_1_1_title1} />
            </LinearGradient>

            <Title title='All Classes' style={styles.box3_title} />
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              <View style={styles.box3_2}>
                {
                  paper.map((item, index) => {
                    return (
                      <LinearGradient
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
                        style={[styles.box3_2_1, { opacity: Number(nowPaperRank) < Number(item.rank) ? 0.5 : 1 }]}
                        key={index}
                      >
                        <Text style={styles.box3_2_1_title}>Week {item.rank}</Text>
                        {
                          Number(nowPaperRank) + 1 === Number(item.rank) && index !== 0 ?
                            <Title title={paper[index - 1].endtime ? `Unlocks in ${TimeDifference1(Number(paper[index - 1].endtime))}` : ''} style={styles.box3_2_1_time} /> :
                            null
                        }
                        {
                          Number(nowPaperRank) < Number(item.rank) ?
                            null :
                            <ImageBackground style={styles.score} source={images.score1}>
                              <Title title={item.score} style={styles.scoreText} />
                            </ImageBackground>
                        }
                        <Pressable
                          style={styles.box3_2_1_1}
                          android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
                          disabled={Number(nowPaperRank) < Number(item.rank)}
                          onPress={() => setNowPaper(item)}
                        >
                          <Title title={item.theme} style={styles.box3_2_1_title1} />
                        </Pressable>
                      </LinearGradient>
                    )
                  })
                }
              </View>
            </ScrollView>

            <View style={styles.bottomView} />
          </View>
        </ScrollView >
      </ImageBackground >
    )
  }
}

export default Academy;