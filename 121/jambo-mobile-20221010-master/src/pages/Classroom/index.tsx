import React from "react";
import LinearGradient from "react-native-linear-gradient";
import IProps from "src/IProps";
import styles from "./style";
import WebView from "react-native-webview";
import Orientation from "react-native-orientation";
import Header from "components/Header";
import Title from "components/Title";
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MyCarousel from "components/MyCarousel";
import images from "src/assets/images";
import GradientButton from "components/GradientButton";
import { AlertDialog, Center, Icon, IconButton, Image, Pressable, Text, useToast, View } from "native-base";
import { finish_watch_video, paper_one } from "src/store/api";
import { Dimensions, ImageBackground, Linking, Modal, ScrollView } from "react-native";
import { CommonActions, useFocusEffect } from "@react-navigation/native";
import { useAppDispatch } from "src/store/hooks";
import { setTime2 } from "src/store/time2/time2Slice";

const { width, height } = Dimensions.get('screen')

interface ISponsors {
  corpname: string
  inio: string
  logo: string
  url: string
}
interface IClass {
  ans_num: number
  author: string
  content: string
  createdate: string
  id: string
  img: string
  intro: string
  modifydate: string
  question_num: string
  rank: string
  sponsor: ISponsors[]
  state: string
  title: string
  url: string
  uv: string
  v_read: number
}
/**
 * 
 * @param props isAfter sid   sid课堂、试卷id  isAfter学习完成后是否可以做题，true做题
 * @returns 
 */
const Classroom = (props: IProps) => {
  const isAfter = props.route.params.isAfter
  const sid = props.route.params.sid
  const toast = useToast()
  const [data, setData] = React.useState<IClass>()
  const [src, setSrc] = React.useState<string>('')
  const [isVertical, setIsVertical] = React.useState<boolean>(false)
  const [current, setCurrent] = React.useState<number>(1)
  const [content, setContent] = React.useState<string[]>([])
  const [sponsors, setSponsors] = React.useState<null | ISponsors>(null)
  let timer: NodeJS.Timer
  const dispatch = useAppDispatch();
  const [visible, setVisible] = React.useState<boolean>(false)

  useFocusEffect(
    React.useCallback(() => {
      let time = 0
      timer = setInterval(() => {
        time++
        dispatch(setTime2(time))
      }, 1000)
      return () => {
        clearInterval(timer)
      };
    }, []),
  );

  React.useEffect(() => {
    get_paper_one();
    Orientation.unlockAllOrientations();
    Orientation.addOrientationListener(flipScreens);
    return () => {
      Orientation.lockToPortrait();
      Orientation.removeOrientationListener(flipScreens)
    }
  }, [])

  const flipScreens = (orientation: Orientation.orientation) => {
    if (orientation === 'PORTRAIT') {
      // 竖屏
      setIsVertical(false)
    } else if (orientation === 'LANDSCAPE') {
      // 横屏
      setIsVertical(true)
      setVisible(false)
    }
  }

  const get_paper_one = () => {
    paper_one({ sid }).then(res => {
      const textArr = res.data.content.split('\n').filter((item: any) => {
        if (item && item.length > 2) {
          return item
        }
      })
      const arr = res.data.url.split(" ")
      for (const item of arr) {
        if (item.includes('src=')) {
          const arr1 = item.split('src=')
          const arr2 = arr1[1].split('"')
          setSrc(arr2[1])
          break
        }
      }
      setData(res.data)
      setContent(textArr)
    })
  }

  const childrenComponent = (item: string, index: number) => {
    if (index === 0) {
      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.text1}>Lesson {data?.rank}</Text>
          <Title title={data?.title} style={styles.text2} numberOfLines={2} />
          {
            data && Array.isArray(data?.sponsor) ?
              <Text style={styles.text1}>Brought to you by:</Text> :
              null
          }
          <ScrollView contentContainerStyle={styles.box1} showsHorizontalScrollIndicator={false} horizontal>
            {
              (data && Array.isArray(data?.sponsor) ? data.sponsor : []).map((ite, i) =>
                <Pressable key={i} onPress={() => setSponsors(ite)}>
                  <Image alt="赞助商" source={{ uri: ite.logo }} style={styles.sponsor} />
                </Pressable>
              )
            }
          </ScrollView>
          <Text style={styles.itemChildText}>{item}</Text>
        </ScrollView>
      )
    }
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.itemChildText}>{item}</Text>
        {
          (index + 1 === content.length) && isAfter ?
            <GradientButton containerStyle={styles.NextExam} onPress={onPressNextExam}>Next</GradientButton> :
            null
        }
      </ScrollView>
    )
  }

  const onPressNextExam = () => {
    finish_watch_video({ sid }).then((res) => {
      setVisible(true)
      // props.navigation.dispatch((state: any) => {
      //   const routes = [...state.routes.slice(0, -1), { name: 'Discipline', params: { sid } }]
      //   return CommonActions.reset({
      //     ...state,
      //     routes,
      //     index: routes.length - 1,
      //   });
      // })
    })
  }

  const onPressNext = () => {
    props.navigation.dispatch((state: any) => {
      const routes = [...state.routes.slice(0, -1), { name: 'Examination', params: { sid } }]
      return CommonActions.reset({
        ...state,
        routes,
        index: routes.length - 1,
      });
    })
  }

  const currentCallback = (current: number) => {
    setCurrent(current)
  }

  const onCloseAlertDialog = () => {
    setSponsors(null)
  }

  const onPressHyperlinks = () => {
    const url = sponsors?.url || ''
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        toast.show({ description: 'The official address is incorrect. Please contact the administrator and try again.' })
      }
    });
  }

  return (
    <LinearGradient
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      colors={['#009DCE', '#342E8F', '#45097A']}
      style={styles.Classroom}
    >
      <Header rightNode={content.length ? <Text style={styles.page}>{current + 1}/{content.length}</Text> : null} />

      <View style={styles.box}>
        <MyCarousel
          data={content}
          childrenComponent={childrenComponent}
          itemWidth={width}
          spacing={0}
          currentCallback={currentCallback}
          initialScrollIndex={0}
        />
      </View>

      <View style={isVertical ? styles.webView1 : styles.webView2}>
        {
          src ?
            <WebView source={{ uri: src }} /> :
            null
        }
      </View>

      <AlertDialog isOpen={!!sponsors} onClose={onCloseAlertDialog} leastDestructiveRef={React.useRef(null)}>
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header>
            <Image alt="赞助商" source={{ uri: sponsors?.logo }} style={styles.imgDialog} />
          </AlertDialog.Header>
          <AlertDialog.Body>
            <Text>  {sponsors?.inio}</Text>
            <Text style={styles.hyperlinks} onPress={onPressHyperlinks}>  {sponsors?.url}</Text>
          </AlertDialog.Body>
        </AlertDialog.Content>
      </AlertDialog>

      <Modal animationType="slide" transparent={true} visible={visible} presentationStyle='fullScreen'>
        <ImageBackground source={images.background1} style={styles.Discipline}>
          <View style={{ flexDirection: 'row-reverse' }}>
            <IconButton style={{ marginRight: 12, marginTop: 12 }} onPress={() => setVisible(false)} icon={<Icon as={<AntDesignIcon name="close" />} />} borderRadius="full" _icon={{ color: "#FFD27B", size: 'lg' }} />
          </View>

          <Center style={styles.content}>
            <Title title='TAKE QUIZ AND EARN' style={styles.title} />
            <View style={styles.box11}>
              <Image source={images.diamond} alt='tip' style={styles.diamond} />
              <Title title='10' style={styles.title1} />
            </View>
            <Text style={styles.text11}>Reminder:</Text>
            <Text style={styles.text22}><Text style={styles.text11}>Score 9</Text> or higher to move on to the next lesson! Didn’t make it this time? No problem, you can take the quiz again <Text style={styles.text1}>after 24 hours.</Text></Text>
            <GradientButton containerStyle={styles.next} onPress={onPressNext}>Let’s Quiz</GradientButton>
          </Center>

          <Image source={images.Lion} alt='Lion' style={styles.img} />
        </ImageBackground>
      </Modal>
    </LinearGradient>
  )
}

export default Classroom;