import React, { useEffect, useState } from "react";
import IProps from "src/IProps";
import images from "src/assets/images";
import Title from "components/Title";
import FeatherIcon from 'react-native-vector-icons/Feather';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import styles from "./style";
import Lottie from 'lottie-react-native';
import MyCarousel from "components/MyCarousel";
import uploadLocation from "src/tool/location";
import { Avatar, Button, Center, Icon, IconButton, Image, Pressable, Progress, ScrollView, Text, View } from "native-base";
import { Dimensions, ImageBackground, ImageSourcePropType, Modal } from "react-native";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { selectMyInfo, setMyInfo } from "src/store/myInfo/myInfoSlice";
import { user_index } from "src/store/api";
import { TimeDifference, TimeDifference1 } from "src/tool/timeDiffer";
import { startGettimgNewMessage } from "src/tool/IM";
import { selectAd } from "src/store/ad/adSlice";

interface IData {
  complete: string
  idcard_state: string
  last_answer_date: number
  reputation: string
  score: string
  subject_id: string
  subject_title: string
  subjectno: string
  task_num: string
  uid: string
  theme: string
}

const { width, height } = Dimensions.get('screen')

const Card = (props: { children?: any, sourceImg: ImageSourcePropType, title: string }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
      style={styles.Card}
    >
      <LinearGradient
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        colors={['#FFDD8D', '#FFB422']}
        style={styles.CardAngle}
      >
        <Image source={props.sourceImg} style={styles.CardImg} alt='icon' />
        <Text style={styles.CardTitle} size='sm' fontWeight='900'>{props.title}</Text>
      </LinearGradient>
      {props.children}
    </LinearGradient>
  )
}

function Home(props: IProps) {
  const myInfo = useAppSelector(selectMyInfo);
  const ad = useAppSelector(selectAd);
  const [open, setOpen] = useState<boolean>(false)
  const [current, setCurrent] = useState<number>(0)
  const dispatch = useAppDispatch();
  const [dataTip, setDataTip] = React.useState<{ img: number }[]>([{ img: images.item1 }, { img: images.item2 }, { img: images.item3 }, { img: images.item4 }])
  let refMyCarousel: any
  const [data, setData] = useState<IData>()
  const [level, setLevel] = React.useState<number>(0)
  const animationRef = React.useRef<Lottie>(null)

  useEffect(() => {
    if (myInfo.uid) {
      getData()
      uploadLocation()
      startGettimgNewMessage()
    }
  }, [myInfo])

  useEffect(() => {
    if (myInfo.accesscount === 1 && ad) {
      getAd()
    }
  }, [myInfo, ad])

  const getAd = () => {
    setOpen(true)
  }

  const getData = () => {
    user_index().then(res => {
      setData(res.data)
      const reputation = Number(res.data.reputation || 0)
      setLevel(reputation)
      reputation && animationRef.current?.play(0, reputation - 1)
    })
  }

  const onRequestClose = () => {
    setOpen(false)
    dispatch(setMyInfo({ ...myInfo, accesscount: 2 }))
  }

  const childrenComponent = (item: { img: number }) => {
    return (
      <Center style={{ height: height * 0.78 - 140, paddingHorizontal: 12 }} >
        <Image source={item.img} resizeMode='contain' style={{ width: '100%', height: '100%' }} />
      </Center>
    )
  }

  const currentCallback = (current: number) => {
    setCurrent(current)
  }

  const onRef = (node: any) => {
    refMyCarousel = node
  }

  const onPressNext = () => {
    if (current === dataTip.length - 1) {
      onRequestClose()
    } else {
      refMyCarousel?.onPressNext()
    }
  }

  return (
    <ImageBackground source={images.background1} style={styles.Home}>
      <View style={styles.header}>
        <Pressable onPress={() => props.navigation.navigate('UserInfo')}>
          <Avatar size={108} source={{ uri: myInfo.avatar }} _text={{ size: '2xl' }}>{myInfo.username.split('')[0]}</Avatar>
        </Pressable>
        <Title title={myInfo.username} style={styles.title} numberOfLines={1} />
        <View style={styles.rightbuttonview}>
          <IconButton icon={<Icon as={<FeatherIcon name="bell" />} />} borderRadius="full" _icon={{ color: "#FFB422" }} onPress={() => props.navigation.navigate('Notifications')} />
          <IconButton icon={<Icon as={<FontAwesome5Icon name="bullhorn" />} />} borderRadius="full" _icon={{ color: "#FFB422" }} onPress={getAd} />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable onPress={() => props.navigation.navigate('Academy')}>
          <Card sourceImg={images.school1} title='JamboAcademy'>
            <View style={styles.JamboAcademy}>
              <View style={styles.JamboAcademyContent}>
                <View style={styles.JamboAcademyContenttop}>
                  <Title title={`WEEK ${data?.subjectno || 1}`} style={styles.JamboAcademyContenttopTitle} />
                  <Center style={styles.JamboAcademyContenttopright}>
                    <Title style={styles.next} title={TimeDifference1(data?.last_answer_date) ? `${TimeDifference1(data?.last_answer_date)} to your next class` : ''} />
                    <Title title={data?.theme} style={styles.JamboAcademyContenttoprightTitle} />
                    <Text size='sm'>Week {data?.subjectno} | Lesson {data?.subjectno}</Text>
                  </Center>
                </View>
                <View style={styles.JamboAcademyContentbottom}>
                  <Image source={images.AcademyActive} style={styles.JamboAcademyContentbottomimg} alt='icon' />
                  <View style={{ flex: 1 }}>
                    <Title title={Number(data?.subjectno) === 1 ? 'Get started with JamboAcademy' : `Completed lesson ${Number(data?.subjectno) - 1} of JamboAcademy`} style={styles.JamboAcademyContentbottomimgText1} />
                    <Text style={styles.JamboAcademyContentbottomimgText2}>{TimeDifference(data?.last_answer_date)}</Text>
                  </View>
                </View>
              </View>
              <FeatherIcon name="chevron-right" color='rgba(0,0,0,0.15)' size={20} />
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate('Credits')}>
          <Card sourceImg={images.Credit} title='JamboScore'>
            <View style={styles.JamboCredit}>
              <Center>
                <Title style={styles.JamboCreditlefttitle1} title="Your Score" />
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
              </Center>
              <View style={{ height: 152, width: 172, position: 'relative' }}>
                <Lottie speed={4} ref={animationRef} source={require('../../assets/chart.json')} autoPlay={false} loop={false} style={{ flex: 1 }} resizeMode='cover' />
                <Title
                  style={{
                    fontSize: 24,
                    color: '#461A86',
                    fontWeight: 'bold',
                    position: 'absolute',
                    top: 76,
                    left: 54,
                    width: 64
                  }}
                  title={`${level || '--'}%`}
                />
              </View>
            </View>
          </Card>
        </Pressable>

        <Pressable onPress={() => props.navigation.navigate('Achievement')}>
          <Card sourceImg={images.rewards} title='JamboRewards'>
            <View style={styles.JamboRewards}>
              <View style={styles.JamboRewardsTop}>
                <Text style={styles.JamboRewardsTopText}>View all</Text>
              </View>
              <View style={styles.JamboRewardsBottom}>
                <View style={styles.JamboRewardsBottomBox1}>
                  <Title title="Points available" style={styles.JamboRewardsBottomBoxText1} />
                  <Title title={`${data?.task_num} tasks in total`} style={styles.JamboRewardsBottomBoxText1} />
                  <Progress value={Number(data?.complete || 0) / Number(data?.task_num) * 100} />
                </View>
                <View style={styles.JamboRewardsBottomBox2}>
                  <Title title={data?.score} style={styles.JamboRewardsBottomBoxText3} />
                  <View style={styles.JamboRewardsBottomBox2Bottom}>
                    <Image source={images.diamond} style={styles.JamboRewardsBottomBox2BottomImg} alt='icon' />
                    <Title title={Number(data?.complete || 0)} style={styles.JamboRewardsBottomBoxText4} />
                  </View>
                </View>
              </View>
            </View>
          </Card>
        </Pressable>

        <View style={styles.bottomView} />
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={open && dataTip.length !== 0}
        onRequestClose={onRequestClose}
      >
        <Center style={styles.modalView}>
          <LinearGradient
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            colors={['#D8FAFF', '#FFFFFF', '#E3EDFF']}
            style={styles.modalContent}
          >
            <View style={{ overflow: 'hidden' }}>
              <MyCarousel
                data={dataTip}
                childrenComponent={childrenComponent}
                itemWidth={width * 0.9}
                spacing={0}
                initialScrollIndex={0}
                borderRadius={0}
                currentCallback={currentCallback}
                onRef={onRef}
              />
            </View>

            <Center>
              <View style={styles.pointView}>
                {
                  dataTip.map((_item, index) =>
                    <View
                      key={index}
                      style={[
                        styles.point,
                        current === index ? {
                          backgroundColor: '#461A86',
                          width: 15
                        } : {}
                      ]}
                    />
                  )
                }
              </View>
              <Button style={styles.NextModal} onPress={onPressNext}>Next</Button>
            </Center>
          </LinearGradient>
        </Center>
      </Modal>
    </ImageBackground>
  )
}

export default Home;